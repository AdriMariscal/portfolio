export default async (request: Request, context: any) => {
  const env = Deno.env.get("ENVIRONMENT") || "development";
  if (env !== "staging") return context.next();

  const user = Deno.env.get("STAGING_USER") ?? "";
  const pass = Deno.env.get("STAGING_PASS") ?? "";

  const unauthorized = () =>
    new Response("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Staging"' },
    });

  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) return unauthorized();

  let decoded = "";
  try {
    decoded = atob(auth.slice("Basic ".length));
  } catch {
    return unauthorized();
  }
  const [u, p] = decoded.split(":");

  if (u !== user || p !== pass) return unauthorized();
  return context.next();
};