/**
 * @fileoverview PWA utilities: install prompt, service worker registration
 * and update flow, online status.
 *
 * Update flow: when a new service worker is installed and waiting, it is told
 * to activate immediately (SKIP_WAITING). The SW itself also calls
 * skipWaiting() on install and clients.claim() on activate, so new versions
 * take over without requiring all tabs to be closed. No forced reload: pages
 * are served network-first, so the next navigation picks up the new build.
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

            // Check for updates when the app comes back to the foreground
            // (installed PWAs can stay open for days).
            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "visible") {
                    registration.update().catch(() => undefined);
                }
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
