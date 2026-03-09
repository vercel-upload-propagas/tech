import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const token = String(formData.get("g-recaptcha-response") ?? "").trim();

  if (!name || !email || !message) {
    const url = new URL("/contato?error=missing", req.nextUrl);
    return NextResponse.redirect(url, { status: 303 });
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (secret) {
    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
        }),
      }
    );
    const verifyJson = (await verifyRes.json()) as { success?: boolean };

    if (!verifyJson.success) {
      const url = new URL("/contato?error=captcha", req.nextUrl);
      return NextResponse.redirect(url, { status: 303 });
    }
  }

  // Aqui você pode integrar com e-mail, CRM, etc.
  console.log("Contato recebido:", { name, email, message });

  const url = new URL("/contato?success=1", req.nextUrl);
  return NextResponse.redirect(url, { status: 303 });
}

