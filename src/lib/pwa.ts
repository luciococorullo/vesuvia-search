/**
 * @fileoverview PWA installation and management utilities
 * 
 * This file provides utilities for Progressive Web App functionality including:
 * - Install prompt management
 * - Service worker registration
 * - Update notifications
 * - Offline status detection
 */

export interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

export class PWAManager {
    private deferredPrompt: BeforeInstallPromptEvent | null = null;
    private isInstallable = false;
    private installPromptCallbacks: Array<(canInstall: boolean) => void> = [];
    private isInitialized = false;

    constructor() {
        // Only initialize on client side
        if (typeof window !== 'undefined') {
            this.setupEventListeners();
            this.isInitialized = true;
        }
    }

    private setupEventListeners() {
        if (typeof window === 'undefined') return;

        console.log('Setting up PWA event listeners');

        // Listen for the beforeinstallprompt event
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('beforeinstallprompt event fired');
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Save the event so it can be triggered later
            this.deferredPrompt = e as BeforeInstallPromptEvent;
            this.isInstallable = true;
            this.notifyInstallPromptCallbacks(true);
        });

        // Listen for the app being installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.deferredPrompt = null;
            this.isInstallable = false;
            this.notifyInstallPromptCallbacks(false);
        });

        // Check if app is already installed
        if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
            console.log('PWA is running in standalone mode');
            this.isInstallable = false;
        } else {
            // Also check for iOS Safari standalone mode
            const isIOSStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
            if (isIOSStandalone) {
                console.log('PWA is running in iOS standalone mode');
                this.isInstallable = false;
            }
        }

        // For debugging - log current state
        setTimeout(() => {
            console.log('PWA Manager state:', {
                isInstallable: this.isInstallable,
                hasDeferredPrompt: !!this.deferredPrompt,
                isStandalone: window.matchMedia('(display-mode: standalone)').matches,
                isIOSStandalone: (window.navigator as unknown as { standalone?: boolean }).standalone === true,
                supportsBeforeInstallPrompt: 'onbeforeinstallprompt' in window,
                userAgent: navigator.userAgent
            });
        }, 1000);
    }

    public async showInstallPrompt(): Promise<{ outcome: string; platform: string } | null> {
        if (!this.isInitialized || !this.deferredPrompt) {
            console.log('Cannot show install prompt:', {
                isInitialized: this.isInitialized,
                hasDeferredPrompt: !!this.deferredPrompt
            });
            return null;
        }

        try {
            // Show the install prompt
            await this.deferredPrompt.prompt();

            // Wait for the user to respond to the prompt
            const { outcome, platform } = await this.deferredPrompt.userChoice;

            console.log('Install prompt result:', { outcome, platform });

            // Clear the deferredPrompt so it can be garbage collected
            this.deferredPrompt = null;
            this.isInstallable = false;
            this.notifyInstallPromptCallbacks(false);

            return { outcome, platform };
        } catch (error) {
            console.error('Error showing install prompt:', error);
            return null;
        }
    }

    public getIsInstallable(): boolean {
        return this.isInstallable;
    }

    public onInstallPromptChange(callback: (canInstall: boolean) => void): () => void {
        this.installPromptCallbacks.push(callback);

        // Return unsubscribe function
        return () => {
            const index = this.installPromptCallbacks.indexOf(callback);
            if (index > -1) {
                this.installPromptCallbacks.splice(index, 1);
            }
        };
    }

    private notifyInstallPromptCallbacks(canInstall: boolean) {
        this.installPromptCallbacks.forEach(callback => callback(canInstall));
    }

    public async registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
        if (!this.isInitialized || !('serviceWorker' in navigator)) {
            return null;
        }

        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('ServiceWorker registration successful');

            // Listen for updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New content is available, show update notification
                            this.showUpdateNotification();
                        }
                    });
                }
            });

            return registration;
        } catch (error) {
            console.log('ServiceWorker registration failed:', error);
            return null;
        }
    }

    private showUpdateNotification() {
        // You can customize this to show a toast notification or modal
        if (confirm('Nuova versione disponibile! Vuoi aggiornare?')) {
            window.location.reload();
        }
    }

    public async requestNotificationPermission(): Promise<NotificationPermission> {
        if ('Notification' in window) {
            return await Notification.requestPermission();
        }
        return 'denied';
    }

    public isOnline(): boolean {
        return navigator.onLine;
    }

    public onlineStatusChange(callback: (isOnline: boolean) => void): () => void {
        const handleOnline = () => callback(true);
        const handleOffline = () => callback(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }
}

// Singleton instance - only create on client side
let pwaManagerInstance: PWAManager | null = null;

export const pwaManager = (() => {
    if (typeof window === 'undefined') {
        // Return a mock object during SSR
        return {
            getIsInstallable: () => false,
            showInstallPrompt: () => Promise.resolve(null),
            onInstallPromptChange: () => () => { },
            registerServiceWorker: () => Promise.resolve(null),
            requestNotificationPermission: () => Promise.resolve('denied' as NotificationPermission),
            isOnline: () => true,
            onlineStatusChange: () => () => { }
        };
    }

    if (!pwaManagerInstance) {
        pwaManagerInstance = new PWAManager();
    }

    return pwaManagerInstance;
})();
