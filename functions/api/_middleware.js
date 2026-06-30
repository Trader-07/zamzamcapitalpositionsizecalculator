/**
 * Optional middleware that runs for every /api/* request.
 * Add CORS, auth, logging here later.
 */
export const onRequest = async (context) => {
  const response = await context.next();
  // Allow same-origin by default. Open CORS by uncommenting if needed.
  // response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('X-Service', 'zamzam-capital');
  return response;
};
