// netlify/edge-functions/basic-auth.ts
export default async (request: Request, context: any) => {
  const host = new URL(request.url).hostname.toLowerCase();
  // Protegemos sólo los branch deploys con estos prefijos:
  const protectedPrefixes = ["staging"]; // añade "dev" si quieres proteger dev también
  const isProtected = protectedPrefixes.some((p) => host.startsWith(`${p}--`));
  if (!isProtected) return context.next();

  // Deja pasar envíos de Netlify Forms (evita 401 en el POST)
  const url = new URL(request.url);
  if (
    request.method === "POST" &&
    (url.pathname === "/contact" || url.pathname === "/thanks")
  ) {
    return context.next();
  }

  const unauthorized = () =>
    new Response("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Staging"' },
    });

  const auth = request.headers.get("authorization") || "";
  if (!auth.startsWith("Basic ")) return unauthorized();

  let decoded = "";
  try {
    decoded = atob(auth.slice(6));
  } catch {
    return unauthorized();
  }

  const [user, pass] = decoded.split(":");
  const expectedUser = Deno.env.get("STAGING_USER") ?? "";
  const expectedPass = Deno.env.get("STAGING_PASS") ?? "";

  if (!expectedUser || !expectedPass) {
    return new Response("Staging credentials not configured", { status: 500 });
  }
  if (user !== expectedUser || pass !== expectedPass) return unauthorized();

  return context.next();

  const url = new URL(request.url);
  if (request.method === 'POST' && (url.pathname === '/contact' || url.pathname === '/thanks')) {
    return context.next(); // deja pasar el envío a Netlify Forms
  }
};
