// Mirror lookups are logged for analytics only. The real wallet analysis
// (Helius history + prices) will live here later; the UI shows a sample for now.
export async function POST(request: Request) {
  try {
    const { wallet } = (await request.json()) as { wallet?: unknown };
    if (typeof wallet === "string" && wallet.length <= 64) {
      console.info("[mirror] lookup", wallet.slice(0, 6));
    }
  } catch {
    /* ignore malformed analytics pings */
  }
  return Response.json({ ok: true });
}
