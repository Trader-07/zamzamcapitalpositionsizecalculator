/**
 * Catch-all for unknown /api/* routes.
 * Cloudflare Pages picks the most specific route first, so
 * this only fires for paths that have no dedicated file.
 */
export async function onRequest({ request }) {
  const url = new URL(request.url);
  return new Response(
    JSON.stringify({ error: 'Not Found', path: url.pathname }),
    {
      status: 404,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    }
  );
}
