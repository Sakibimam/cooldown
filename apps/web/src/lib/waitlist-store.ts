import { promises as fs } from "fs";
import path from "path";

export type Intent = "quitting" | "trading" | "helping";

export type WaitlistEntry = {
  email: string;
  intent: Intent | null;
  source: string | null;
  createdAt: string;
};

export type SaveResult = { position: number; alreadyJoined: boolean };

/**
 * Waitlist storage.
 *
 * - If SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set, entries go to the
 *   Supabase table `waitlist` (columns: email text primary key, intent text,
 *   source text, created_at timestamptz default now()).
 * - Otherwise entries go to `data/waitlist.json` next to the app. That works
 *   for local development only; serverless hosts don't keep files.
 */
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function saveEntry(entry: WaitlistEntry): Promise<SaveResult> {
  if (SUPABASE_URL && SUPABASE_KEY) return saveSupabase(entry);
  return saveFile(entry);
}

export async function setIntent(email: string, intent: Intent): Promise<void> {
  if (SUPABASE_URL && SUPABASE_KEY) {
    await fetch(
      `${SUPABASE_URL}/rest/v1/waitlist?email=eq.${encodeURIComponent(email)}`,
      {
        method: "PATCH",
        headers: supabaseHeaders(),
        body: JSON.stringify({ intent }),
      },
    );
    return;
  }
  const list = await readFile();
  const found = list.find((e) => e.email === email);
  if (found) {
    found.intent = intent;
    await writeFile(list);
  }
}

/* ---------- Supabase ---------- */

function supabaseHeaders() {
  return {
    apikey: SUPABASE_KEY as string,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };
}

async function saveSupabase(entry: WaitlistEntry): Promise<SaveResult> {
  const insert = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: "POST",
    headers: { ...supabaseHeaders(), Prefer: "return=minimal" },
    body: JSON.stringify({
      email: entry.email,
      intent: entry.intent,
      source: entry.source,
    }),
  });
  const alreadyJoined = insert.status === 409;
  if (!insert.ok && !alreadyJoined) {
    throw new Error(`Supabase insert failed: ${insert.status}`);
  }
  const count = await fetch(`${SUPABASE_URL}/rest/v1/waitlist?select=email`, {
    method: "HEAD",
    headers: { ...supabaseHeaders(), Prefer: "count=exact" },
  });
  const range = count.headers.get("content-range") ?? "";
  const total = Number(range.split("/")[1] ?? "0") || 0;
  return { position: total, alreadyJoined };
}

/* ---------- Local file (development) ---------- */

const FILE = path.join(process.cwd(), "data", "waitlist.json");

async function readFile(): Promise<WaitlistEntry[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as WaitlistEntry[];
  } catch {
    return [];
  }
}

async function writeFile(list: WaitlistEntry[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(list, null, 2));
}

async function saveFile(entry: WaitlistEntry): Promise<SaveResult> {
  const list = await readFile();
  const index = list.findIndex((e) => e.email === entry.email);
  if (index >= 0) return { position: index + 1, alreadyJoined: true };
  list.push(entry);
  await writeFile(list);
  return { position: list.length, alreadyJoined: false };
}
