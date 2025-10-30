// netlify/edge-functions/basic-auth.ts
// Protege Deploy Previews (y opcionalmente el branch "staging") con Basic Auth.
// Usa STAGING_USER y STAGING_PASS (variables en Netlify) para validar.

export default async function (request: Request, context: any) {
  // Activa en Deploy Preview (Netlify expone REVIEW_ID)
  const isDeployPreview = !!Deno.env.get('REVIEW_ID');

  // Opcional: también proteger el branch deploy "staging"
  const hostname = new URL(request.url).hostname;
  const isStagingBranch = hostname.startsWith('staging--');

  if (!isDeployPreview && !isStagingBranch) {
    // Producción o ramas normales → no proteger
    return context.next();
  }

  const reqUrl = new URL(request.url); // <- nombre distinto, no re-declarar "url"

  // Permitir assets públicos sin pedir auth
  const passthroughPrefixes = [
    '/favicon', '/robots.txt', '/sitemap', '/_astro/', '/_image', '/images/', '/assets/'
  ];
  if (passthroughPrefixes.some((p) => reqUrl.pathname.startsWith(p))) {
    return context.next();
  }

  const expectedUser = Deno.env.get('STAGING_USER') ?? '';
  const expectedPass = Deno.env.get('STAGING_PASS') ?? '';

  const unauthorized = () =>
    new Response('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Staging", charset="UTF-8"' },
    });

  const auth = request.headers.get('authorization') || '';
  if (!auth.startsWith('Basic ')) return unauthorized();

  const [user, pass] = atob(auth.slice(6)).split(':');
  if (user !== expectedUser || pass !== expectedPass) return unauthorized();

  return context.next();
}
