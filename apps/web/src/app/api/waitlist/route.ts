import { saveEntry, type Intent } from "@/lib/waitlist-store";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INTENTS: Intent[] = ["quitting", "trading", "helping"];

function bad(error: string, status = 400) {
  return Response.json({ ok: false, error }, { status });
}

// Called by the waitlist form: { email, intent, referrer } → { ok, position, email }
export async function POST(request: Request) {
  let body: { email?: unknown; intent?: unknown; referrer?: unknown };
  try {
    body = await request.json();
  } catch {
    return bad("Send the email as JSON.");
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) {
    return bad("Enter a full email address, like name@example.com.");
  }
  const intent = INTENTS.includes(body.intent as Intent)
    ? (body.intent as Intent)
    : null;
  const source =
    typeof body.referrer === "string" ? body.referrer.slice(0, 200) : null;

  try {
    const { position, alreadyJoined } = await saveEntry({
      email,
      intent,
      source,
      createdAt: new Date().toISOString(),
    });
    return Response.json({ ok: true, position, email, alreadyJoined });
  } catch {
    return bad("We couldn't save your email. Try again in a minute.", 500);
  }
}
