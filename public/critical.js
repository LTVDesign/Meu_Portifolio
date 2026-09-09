console.clear();
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
      console.log('[RECOVERY] Service Worker unregistered successfully');
    }
  }).catch(function (err) {
    console.log('[RECOVERY] Service Worker unregistration failed: ', err);
  });
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(function () {
    var routes = ['/formacao', '/projetos', '/cursos', '/contato'];
    for (var i = 0; i < routes.length; i++) {
      var link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = routes[i];
      document.head.appendChild(link);
    }
  }, { timeout: 2000 });
}

window.addEventListener('error', function (e) {
  console.error('GLOBAL ERROR:', e.message, e.filename, e.lineno, e.colno, e.error);
});
window.addEventListener('unhandledrejection', function (e) {
  console.error('UNHANDLED REJECTION:', e.reason);
});
console.log("HTML loaded, waiting for main.tsx");
window.scrollTo(0, 0);
window.addEventListener('load', function () {
  window.scrollTo(0, 0);
});

fetch('/schema.json').then(function(r){return r.json()}).then(function(d){
  var s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(d);document.head.appendChild(s);
});
