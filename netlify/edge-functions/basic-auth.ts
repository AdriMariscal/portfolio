@"
export default async (request: Request, context: any) => {
  const env = Deno.env.get("ENVIRONMENT") || "development";
  if (env !== "staging") return context.next();

  const user = Deno.env.get("STAGING_USER");
  const pass = Deno.env.get("STAGING_PASS");

  const unauthorized = () =>
    new Response("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Staging"' },
    });

  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();

  const [u, p] = atob(auth.split(" ")[1]).split(":");
  if (u !== user || p !== pass) return unauthorized();

  return context.next();
};
"@ | Out-File -FilePath netlify/edge-functions/basic-auth.ts -Encoding utf8
