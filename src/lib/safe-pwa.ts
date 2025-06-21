/**
 * @fileoverview Safe PWA Manager Wrapper
 * 
 * Provides a safe wrapper around PWA functionality that handles
 * loading failures and provides fallback behavior
 */

"use client";

interface SafePWAManager {
    isInstallable: boolean;
    showInstallPrompt: () => Promise<{ outcome: string; platform: string } | null>;
    onInstallPromptChange: (callback: (canInstall: boolean) => void) => () => void;
    registerServiceWorker: () => Promise<ServiceWorkerRegistration | null>;
    isOnline: () => boolean;
}

let pwaManagerInstance: SafePWAManager | null = null;

export const getSafePWAManager = async (): Promise<SafePWAManager> => {
    if (pwaManagerInstance) {
        return pwaManagerInstance;
    }

    try {
        // Try to load the PWA manager
        const pwaModule = await import("@/lib/pwa");
        pwaManagerInstance = {
            isInstallable: pwaModule.pwaManager.getIsInstallable(),
            showInstallPrompt: () => pwaModule.pwaManager.showInstallPrompt(),
            onInstallPromptChange: (callback) => pwaModule.pwaManager.onInstallPromptChange(callback),
            registerServiceWorker: () => pwaModule.pwaManager.registerServiceWorker(),
            isOnline: () => pwaModule.pwaManager.isOnline(),
        };
    } catch (error) {
        console.warn("Failed to load PWA manager, using fallback:", error);

        // Fallback implementation
        pwaManagerInstance = {
            isInstallable: false,
            showInstallPrompt: async () => null,
            onInstallPromptChange: () => () => { },
            registerServiceWorker: async () => null,
            isOnline: () => navigator?.onLine ?? true,
        };
    }

    return pwaManagerInstance;
};
