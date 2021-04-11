
self.addEventListener('install', async event => {

    self.skipWaiting(); // life cycle manage
    console.log("installing");
    // autres actions au start de l'app
    const cache = await cache.open("TEST");
    cache.add("main.css");
});

self.addEventListener('fetch',event => {

    console.log("fetching");
    if (event.request.url.includes("test.txt"))
    {
        let reponse = new Response();
        event.respondWith(reponse);
    }
});

self.addEventListener('activate',event => {

    console.log("Service worker fonctionne");
});