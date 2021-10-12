function handleRequest(request: Request): Response {
  console.log("Request:", request);
  const now = Date.now();
  const res = JSON.stringify({
    now,
    nowFriendly: new Date(now),
    requestUrl: request.url,
  });
  return new Response(res, {
    headers: { "content-type": "application/json; charset=UTF-8" },
  });
}

addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(handleRequest(event.request));
});
