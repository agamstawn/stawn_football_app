importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox){
  console.log(`Workbox berhasil dimuat`);
}
else{
  console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/profile_team.html', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/schedule.html', revision: '1' },
  { url: '/pages/myleague.html', revision: '1' },
  { url: '/css/materialize.css', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/images/icon.png', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/database.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/controller.js', revision: '1' },
  { url: '/js/schedule.js', revision: '1' },
  { url: '/js/materialize.js', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/standings.js', revision: '1' },
  { url: '/js/myleague.js', revision: '1' },
  { url: '/js/profile_team.js', revision: '1' },
  { url: '/js/sw.js', revision: '1' },
  { url: 'manifest.json', revision: '1' }
]);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
  new RegExp('/css/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'css'
  })
);

workbox.routing.registerRoute(
  new RegExp('/js/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'js'
  })
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  }),
);

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
 
// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

self.addEventListener("fetch", function(event){
  event.respondWith(
    caches
      .match(event.request, { cacheName: 'api' })
      .then(function(response){
        if (response) {
          console.log("ServiceWorker : Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: memuat dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
      );
});

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'images/notif.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});