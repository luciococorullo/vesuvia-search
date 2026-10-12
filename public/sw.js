/* VesuviaSearch service worker
 *
 * Strategies:
 * - navigations: network-first -> cached page -> /offline
 * - static assets (/_next/static, /icons, fonts, manifest): stale-while-revalidate
 * - /api/stations: stale-while-revalidate
 * - every other /api/* (board, train-stops, journeys, ...): network only, never cached
 * - only same-origin GET requests are handled; everything else goes to the network
 *
 * Bump VERSION to invalidate all caches on deploy-sensitive changes.
 */

const VERSION = "v4";
const PREFIX = "vesuvia-";
const STATIC_CACHE = `${PREFIX}static-${VERSION}`;
const PAGES_CACHE = `${PREFIX}pages-${VERSION}`;
const DATA_CACHE = `${PREFIX}data-${VERSION}`;
const CURRENT_CACHES = [STATIC_CACHE, PAGES_CACHE, DATA_CACHE];

const OFFLINE_URL = "/offline";
const PRECACHE_URLS = [
  OFFLINE_URL,
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

const SWR_API_PATHS = ["/api/stations"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      // Precache individually so a single failure doesn't abort install.
      await Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(new Request(url, { cache: "reload" })).catch(() => undefined)
        )
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => !CURRENT_CACHES.includes(key))
          .map((key) => caches.delete(key))
      );
      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable().catch(() => undefined);
      }
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function isStaticAsset(url, request) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/manifest.json" ||
    url.pathname === "/favicon.ico" ||
    request.destination === "font" ||
    /\.(?:woff2?|ttf|otf)$/.test(url.pathname)
  );
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(event));
    return;
  }

  if (url.pathname.startsWith("/api/")) {
    if (SWR_API_PATHS.includes(url.pathname)) {
      event.respondWith(staleWhileRevalidate(event, DATA_CACHE));
    }
    // Any other API route: network only (let the browser handle it).
    return;
  }

  if (isStaticAsset(url, request)) {
    event.respondWith(staleWhileRevalidate(event, STATIC_CACHE));
  }
});

async function networkFirstNavigation(event) {
  const { request } = event;
  // Key pages by path only so query strings don't bloat the cache.
  const url = new URL(request.url);
  const cacheKey = url.origin + url.pathname;
  const cache = await caches.open(PAGES_CACHE);

  try {
    const preloaded = await event.preloadResponse;
    const response = preloaded || (await fetch(request));
    if (response && response.ok && response.type === "basic") {
      event.waitUntil(cache.put(cacheKey, response.clone()));
    }
    return response;
  } catch {
    const cached = await cache.match(cacheKey);
    if (cached) return cached;
    const offline = await caches.match(OFFLINE_URL);
    if (offline) return offline;
    return new Response("Offline", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

async function staleWhileRevalidate(event, cacheName) {
  const { request } = event;
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const network = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        event.waitUntil(cache.put(request, response.clone()).catch(() => undefined));
      }
      return response;
    })
    .catch(() => undefined);

  if (cached) {
    event.waitUntil(network);
    return cached;
  }

  const response = await network;
  return response || Response.error();
}
