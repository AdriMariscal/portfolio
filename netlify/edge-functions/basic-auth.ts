export default async (request: Request, context: any) => {
  // Detecta si es un Branch Deploy protegido por prefijo
  const host = new URL(request.url).hostname.toLowerCase();
  const protectedPrefixes = ["staging"]; // añade "dev" si quieres proteger dev también
  const isProtected = protectedPrefixes.some((p) => host.startsWith(`${p}--`));
  if (!isProtected) return context.next();

  const user = Deno.env.get("STAGING_USER") ?? "";
  const pass = Deno.env.get("STAGING_PASS") ?? "";

  const unauthorized = () =>
    new Response("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Staging"' },
    });

  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();

  let decoded = "";
  try {
    decoded = atob(auth.slice(6));
  } catch {
    return unauthorized();
  }
  const [u, p] = decoded.split(":");
  if (u !== user || p !== pass) return unauthorized();

  return context.next();

  const url = new URL(request.url);
  if (request.method === 'POST' && (url.pathname === '/contact' || url.pathname === '/thanks')) {
    return context.next(); // deja pasar el envío a Netlify Forms
  }
};
