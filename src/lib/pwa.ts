/**
 * @fileoverview PWA utilities: install prompt, service worker registration
 * and update flow, online status.
 *
 * Update flow: when a new service worker is installed and waiting, it is told
 * to activate immediately (SKIP_WAITING). The SW itself also calls
 * skipWaiting() on install and clients.claim() on activate, so new versions
 * take over without requiring all tabs to be closed.
 *
 * An installed app (iOS especially) can stay in memory for days and, being a
 * single page, never navigates: it would keep running the old bundle. So when
 * the app comes back to the foreground it asks /api/version for the live
 * build id and reloads if it differs from its own. sw.js rarely changes, so
 * this is what actually delivers most deploys.
 */

export interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: "accepted" | "dismissed";
        platform: string;
    }>;
    prompt(): Promise<void>;
}

const SW_URL = "/sw.js";
const VERSION_URL = "/api/version";
/** Minimum time between two version checks. */
const VERSION_CHECK_INTERVAL_MS = 60_000;

let lastVersionCheck = 0;
let reloading = false;

function reloadOnce() {
    if (reloading) return;
    reloading = true;
    window.location.reload();
}

/** Reloads the page if a newer deployment than the running bundle is live. */
async function reloadIfNewBuild() {
    const current = process.env.NEXT_PUBLIC_BUILD_ID;
    if (!current || reloading || !navigator.onLine) return;
    const now = Date.now();
    if (now - lastVersionCheck < VERSION_CHECK_INTERVAL_MS) return;
    lastVersionCheck = now;
    try {
        const res = await fetch(VERSION_URL, { cache: "no-store" });
        if (!res.ok) return;
        const { buildId } = (await res.json()) as { buildId?: string | null };
        if (buildId && buildId !== current) reloadOnce();
    } catch {
        /* offline or server error: try again next time */
    }
}

function activateWaiting(registration: ServiceWorkerRegistration) {
    registration.waiting?.postMessage({ type: "SKIP_WAITING" });
}

export class PWAManager {
    private deferredPrompt: BeforeInstallPromptEvent | null = null;
    private isInstallable = false;
    private installPromptCallbacks: Array<(canInstall: boolean) => void> = [];
    private registrationPromise: Promise<ServiceWorkerRegistration | null> | null = null;

    constructor() {
        if (typeof window !== "undefined") {
            this.setupEventListeners();
        }
    }

    private setupEventListeners() {
        window.addEventListener("beforeinstallprompt", (e) => {
            // Prevent the mini-infobar; we show our own install button.
            e.preventDefault();
            this.deferredPrompt = e as BeforeInstallPromptEvent;
            this.isInstallable = true;
            this.notifyInstallPromptCallbacks(true);
        });

        window.addEventListener("appinstalled", () => {
            this.deferredPrompt = null;
            this.isInstallable = false;
            this.notifyInstallPromptCallbacks(false);
        });
    }

    public isStandalone(): boolean {
        if (typeof window === "undefined") return false;
        const iosStandalone =
            (window.navigator as unknown as { standalone?: boolean }).standalone === true;
        return iosStandalone || window.matchMedia?.("(display-mode: standalone)").matches === true;
    }

    public async showInstallPrompt(): Promise<{ outcome: string; platform: string } | null> {
        if (!this.deferredPrompt) return null;

        try {
            await this.deferredPrompt.prompt();
            const { outcome, platform } = await this.deferredPrompt.userChoice;
            this.deferredPrompt = null;
            this.isInstallable = false;
            this.notifyInstallPromptCallbacks(false);
            return { outcome, platform };
        } catch (error) {
            console.error("Error showing install prompt:", error);
            return null;
        }
    }

    public getIsInstallable(): boolean {
        return this.isInstallable && !this.isStandalone();
    }

    public onInstallPromptChange(callback: (canInstall: boolean) => void): () => void {
        this.installPromptCallbacks.push(callback);
        return () => {
            this.installPromptCallbacks = this.installPromptCallbacks.filter((cb) => cb !== callback);
        };
    }

    private notifyInstallPromptCallbacks(canInstall: boolean) {
        this.installPromptCallbacks.forEach((callback) => callback(canInstall));
    }

    /** Registers the service worker once; subsequent calls return the same registration. */
    public registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
        if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
            return Promise.resolve(null);
        }
        if (!this.registrationPromise) {
            this.registrationPromise = this.doRegister();
        }
        return this.registrationPromise;
    }

    private async doRegister(): Promise<ServiceWorkerRegistration | null> {
        try {
            const registration = await navigator.serviceWorker.register(SW_URL, {
                scope: "/",
                updateViaCache: "none",
            });

            // A new SW may already be waiting (e.g. installed in a previous visit).
            activateWaiting(registration);

            registration.addEventListener("updatefound", () => {
                const newWorker = registration.installing;
                if (!newWorker) return;
                newWorker.addEventListener("statechange", () => {
                    if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                        activateWaiting(registration);
                    }
                });
            });

            // A new SW took over an already controlled page: reload so the
            // page and the SW run the same build.
            const hadController = !!navigator.serviceWorker.controller;
            navigator.serviceWorker.addEventListener("controllerchange", () => {
                if (hadController) reloadOnce();
            });

            // Check for updates when the app comes back to the foreground
            // (installed PWAs can stay open for days).
            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "visible") {
                    registration.update().catch(() => undefined);
                    void reloadIfNewBuild();
                }
            });
            window.addEventListener("pageshow", (e) => {
                if (e.persisted) void reloadIfNewBuild();
            });

            return registration;
        } catch (error) {
            console.warn("Service worker registration failed:", error);
            return null;
        }
    }

    public async requestNotificationPermission(): Promise<NotificationPermission> {
        if (typeof window !== "undefined" && "Notification" in window) {
            return Notification.requestPermission();
        }
        return "denied";
    }

    public isOnline(): boolean {
        return typeof navigator === "undefined" ? true : navigator.onLine;
    }

    public onlineStatusChange(callback: (isOnline: boolean) => void): () => void {
        const handleOnline = () => callback(true);
        const handleOffline = () => callback(false);
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }
}

type PWAManagerLike = Pick<
    PWAManager,
    | "getIsInstallable"
    | "showInstallPrompt"
    | "onInstallPromptChange"
    | "registerServiceWorker"
    | "requestNotificationPermission"
    | "isOnline"
    | "onlineStatusChange"
    | "isStandalone"
>;

// Singleton: real manager on the client, inert stub during SSR.
export const pwaManager: PWAManagerLike =
    typeof window === "undefined"
        ? {
              getIsInstallable: () => false,
              showInstallPrompt: () => Promise.resolve(null),
              onInstallPromptChange: () => () => {},
              registerServiceWorker: () => Promise.resolve(null),
              requestNotificationPermission: () => Promise.resolve("denied" as NotificationPermission),
              isOnline: () => true,
              onlineStatusChange: () => () => {},
              isStandalone: () => false,
          }
        : new PWAManager();
