// service worker for disciplinify

const cacheName = "version-1";
const urlsToCache = ['./index.html', './offline.html'];

const self = this;

// installing service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) => {console.log("opened cache"); return cache.addAll(urlsToCache)})
    )
})

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
  
          return fetch(event.request)
            .then((networkResponse) => {
              if (!networkResponse || networkResponse.status !== 200) {
                return caches.match('./offline.html');
              }
  
              const clonedResponse = networkResponse.clone();
              caches.open(cacheName)
                .then((cache) => cache.put(event.request, clonedResponse));
  
              return networkResponse;
            })
            .catch(() => caches.match('./offline.html'));
        })
    );
  });
  

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(cacheName);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});