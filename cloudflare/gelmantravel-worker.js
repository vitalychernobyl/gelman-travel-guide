const PREFIX = "/gelmantravel";
const ORIGIN = "https://gelman-travel-guide.pages.dev";
const NO_INDEX = "noindex, nofollow, noarchive, noimageindex";

function withNoIndex(response) {
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", NO_INDEX);
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const isAppPath = url.pathname === PREFIX || url.pathname.startsWith(`${PREFIX}/`);

    if (!isAppPath) {
      return withNoIndex(new Response("Not found", { status: 404 }));
    }

    if (url.pathname === PREFIX) {
      return Response.redirect(`${url.origin}${PREFIX}/${url.search}`, 308);
    }

    const upstream = new URL(ORIGIN);
    upstream.pathname = url.pathname.slice(PREFIX.length) || "/";
    upstream.search = url.search;

    const upstreamRequest = new Request(upstream.toString(), request);
    const response = await fetch(upstreamRequest);
    return withNoIndex(response);
  }
};
