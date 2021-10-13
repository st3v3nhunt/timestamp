function generateErrorResponse(searchParams: URLSearchParams) {
  const error = parseInt(searchParams.get("error") ?? "400", 10);
  const errorRes = JSON.stringify({
    error,
  });
  return new Response(errorRes, {
    headers: { "content-type": "application/json; charset=UTF-8" },
    status: error,
  });
}

function handleRequest(request: Request): Response {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path.endsWith(".ico")) {
    return new Response(null);
  }

  console.log("Request:", request);

  const searchParams = new URLSearchParams(url.searchParams);
  if (searchParams.has("error")) {
    return generateErrorResponse(searchParams);
  }

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
