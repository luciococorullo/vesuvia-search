/**
 * @fileoverview Safe, lazily-loaded wrapper around the PWA manager with a
 * no-op fallback if the module fails to load.
 */

"use client";

interface SafePWAManager {
    /** Live value (getter), not a snapshot. */
    readonly isInstallable: boolean;
    showInstallPrompt: () => Promise<{ outcome: string; platform: string } | null>;
    onInstallPromptChange: (callback: (canInstall: boolean) => void) => () => void;
    registerServiceWorker: () => Promise<ServiceWorkerRegistration | null>;
    isOnline: () => boolean;
}

let instance: SafePWAManager | null = null;

export const getSafePWAManager = async (): Promise<SafePWAManager> => {
    if (instance) return instance;

    try {
        const { pwaManager } = await import("@/lib/pwa");
        instance = {
            get isInstallable() {
                return pwaManager.getIsInstallable();
            },
            showInstallPrompt: () => pwaManager.showInstallPrompt(),
            onInstallPromptChange: (callback) => pwaManager.onInstallPromptChange(callback),
            registerServiceWorker: () => pwaManager.registerServiceWorker(),
            isOnline: () => pwaManager.isOnline(),
        };
    } catch (error) {
        console.warn("Failed to load PWA manager, using fallback:", error);
        instance = {
            isInstallable: false,
            showInstallPrompt: async () => null,
            onInstallPromptChange: () => () => {},
            registerServiceWorker: async () => null,
            isOnline: () => (typeof navigator === "undefined" ? true : navigator.onLine),
        };
    }

    return instance;
};
