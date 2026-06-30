/**
 * Cloudflare Pages Function
 * Route: GET /api/health
 *
 * Skeleton example. Add real endpoints as siblings
 * (e.g. functions/api/contact.js, functions/api/leads.js).
 */
export async function onRequestGet() {
  return new Response(
    JSON.stringify({ status: 'ok', service: 'zamzam-capital', ts: Date.now() }),
    { headers: { 'content-type': 'application/json; charset=utf-8' } }
  );
}
