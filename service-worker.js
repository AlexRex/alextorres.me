!function(){"use strict";const e=["client/index.00132eb6.js","client/index.f30eead6.js","client/[slug].7cd0dcd0.js","client/index.c7dc15c6.js","client/[slug].4c99048f.js","client/bio.b897cead.js","client/client.9de94c0a.js"].concat(["service-worker-index.html","CNAME","bachelor_thesis.pdf","favicon.ico","global.css","posts/improve-site/performance-next.png","posts/improve-site/performance-next.webp","posts/improve-site/performance-sapper.png","posts/improve-site/performance-sapper.webp","posts/quit-job/gmr.jpg"]).filter(e=>!e.includes("pdf")).filter(e=>!e.includes("CNAME")).filter(e=>!e.includes("posts")),t=new Set(e);self.addEventListener("install",t=>{t.waitUntil(caches.open("cache1735909893643").then(t=>t.addAll(e)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const t of e)"cache1735909893643"!==t&&await caches.delete(t);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const s=new URL(e.request.url);s.protocol.startsWith("http")&&(s.hostname===self.location.hostname&&s.port!==self.location.port||(s.host===self.location.host&&t.has(s.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1735909893643").then(async t=>{try{const s=await fetch(e.request);return t.put(e.request,s.clone()),s}catch(s){const c=await t.match(e.request);if(c)return c;throw s}}))))})}();
