function handleRequest(request: Request): Response {
  console.log("Request:", request);
  return new Response(JSON.stringify({ now: Date.now(), url: request.url }), {
    headers: { "content-type": "application/json; charset=UTF-8" },
  });
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});
