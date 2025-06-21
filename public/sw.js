const CACHE_NAME = 'vesuvia-search-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.svg',
  '/icons/icon-512x512.svg',
  // Add other static assets as needed
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for train data updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'train-data-sync') {
    event.waitUntil(syncTrainData());
  }
});

async function syncTrainData() {
  try {
    // Sync latest train data when connection is restored
    const response = await fetch('/api/stations');
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put('/api/stations', response.clone());
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// Push notification handler (for future use)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nuovo aggiornamento disponibile',
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/icon-96x96.svg',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Visualizza',
        icon: '/icons/icon-96x96.svg'
      },
      {
        action: 'close',
        title: 'Chiudi',
        icon: '/icons/icon-96x96.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('VesuviaSearch', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
