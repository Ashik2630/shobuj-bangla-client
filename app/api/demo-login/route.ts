import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const host = req.headers.get("host") || "localhost:3000";
  const origin = process.env.BETTER_AUTH_URL || `http://${host}`;

  const email = "demo@shobujbangla.test";
  const password = "DemoPass123!";

  // Try to create demo user via admin endpoint (ignore failure if already exists or admin not enabled)
  try {
    await fetch(`${origin}/api/auth/admin/create-user`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password, name: "Demo User" }),
    });
  } catch (err) {
    // ignore
  }

  // Now sign in the demo user and proxy the Set-Cookie header to the client
  const signInRes = await fetch(`${origin}/api/auth/sign-in`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password, rememberMe: true }),
  });

  const payload = await signInRes.text().catch(() => "{}");
  const json = (() => {
    try {
      return JSON.parse(payload);
    } catch {
      return { raw: payload };
    }
  })();

  const res = NextResponse.json(json, { status: signInRes.status });

  // Forward Set-Cookie header(s) if present so the browser receives the session cookie
  const setCookie = signInRes.headers.get("set-cookie") || signInRes.headers.get("Set-Cookie");
  if (setCookie) res.headers.set("set-cookie", setCookie);

  return res;
}
