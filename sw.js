/* Version: 1.0.23 */
var cacheId = "on9";
self.addEventListener('install', function(e) {
  console.log('install');

  // waitUntil tells the browser that the install event is not finished until we have
  // cached all of our files
  e.waitUntil(
    // Here we call our cache "myonsenuipwa", but you can name it anything unique
    caches.open(cacheId).then(cache => {
      // If the request for any of these resources fails, _none_ of the resources will be
      // added to the cache.
      return cache.addAll([
	'.',
        'index.html',
        'manifest.json',
        'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/css/onsenui.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/css/onsen-css-components.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/css/ionicons/css/ionicons.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/css/material-design-iconic-font/css/material-design-iconic-font.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/css/font_awesome/css/all.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/css/font_awesome/css/v4-shims.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/css/font_awesome/webfonts/fa-regular-400.woff2',
		'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/css/font_awesome/webfonts/fa-brands-400.woff2',
		'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/css/font_awesome/webfonts/fa-solid-900.woff2',
		'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/css/material-design-iconic-font/fonts/Material-Design-Iconic-Font.woff2?v=2.2.0',
		'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/js/onsenui.min.js',
		'https://unpkg.com/@zxing/library@0.18.3/umd/index.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js',
		'https://cdn.jsdelivr.net/npm/jquery-dateformat@1.0.4/dist/jquery-dateformat.min.js',
		'https://cdn.jsdelivr.net/npm/vue@2.6.12',
		'https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js',
		'https://cdn.jsdelivr.net/npm/vue-onsenui@2.6.2',
		'home_enter.jpg',
		'home_taxi.jpg',
		'home_confirmed.jpg',
		'msg_bg.jpg'
      ]);
    })
  );
});

// 2. Intercept requests and return the cached version instead
self.addEventListener('fetch', function(e) {
  e.respondWith(
    // check if this file exists in the cache
    caches.open(cacheId).then(cache=>{
    return cache.match(e.request)
      // Return the cached file, or else try to get it from the server
      .then(response => {
          if(response) return response;
          return fetch(e.request).then(response => {
             cache.put(e.request, response.clone());
             return response;
          });
      });
   })
  );
});
