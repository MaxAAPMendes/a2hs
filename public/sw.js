const cacheName = 'v1:static';
const filesToCache = ['./'];

self.addEventListener('install', function(e) {
  console.log('installing sw');
  e.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('abrindo cache');
        const addCache = cache.addAll(filesToCache);
        console.log('cache added');
        return addCache;
      })
  );
});


// self.addEventListener('install', function(event) {
//   // Perform install steps
//   console.log('installing sw');
//   event.waitUntil(
//       caches.open(CACHE_NAME)
//           .then(function(cache) {
//               console.log('Opened cache');
//               var x = cache.addAll(urlsToCache);
//               console.log('cache added');
//               return x;
//           })
//   );
// });

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});