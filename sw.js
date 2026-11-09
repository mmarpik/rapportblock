// Offline-cache för Rapportblock. Höj versionen när filerna ändras.
const CACHE = 'rapportblock-v8';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Sidan: nätet först, så att en ny version kommer fram när det finns täckning.
// Övrigt (ikoner, typsnitt): cachen först.
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.mode === 'navigate') {
    // Nätet får hålla på i bakgrunden och uppdaterar cachen, även när cachen redan svarade.
    // waitUntil anropas synkront, så att eventet lever kvar även när cachen redan har svarat.
    const net = fetch(req);
    e.waitUntil(net.then(res => { const copy = res.clone(); return caches.open(CACHE).then(c => c.put('./index.html', copy)); }).catch(() => {}));
    e.respondWith(caches.match('./index.html').then(cached => {
      if (!cached) return net.catch(() => caches.match('./index.html'));
      // Svag täckning: efter 2,5 s visas den cachade sidan. Nästa start får den nya.
      const slow = new Promise(r => setTimeout(() => r(cached), 2500));
      return Promise.race([net, slow]).catch(() => cached);
    }));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  })));
});
