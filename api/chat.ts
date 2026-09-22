/**
 * Vercel serverless proxy for the portfolio chat demo.
 *
 * This exists so the Gemini key stays on the server. Point the front end at it
 * with `VITE_CHAT_ENDPOINT=/api/chat` and set `GEMINI_API_KEY` in the Vercel
 * project settings (no `VITE_` prefix — that prefix is what makes a variable
 * public).
 *
 * Any failure here returns a non-200, and the client falls back to its
 * hand-written replies.
 */

/** Web-standard Request/Response signature, so this runs on the edge runtime. */
export const config = { runtime: "edge" };

const MODEL = "gemini-3.6-flash";
const MAX_PROMPT_LENGTH = 300;
const MAX_HISTORY = 6;
/** Generous enough that a two-sentence answer never cuts mid-word. */
const MAX_OUTPUT_TOKENS = 320;

/** Requests allowed per IP per window — a crude cap on bill surprises. */
const RATE_LIMIT = 12;
const RATE_WINDOW_MS = 60_000;

const SYSTEM_PROMPT = `You are the assistant embedded in Baptiste Poulain's portfolio site.

About Baptiste: frontend engineer at SFEIR, currently working on L'Oréal GPT for L'Oréal. Previously fullstack developer for Decathlon and Adeo through SFEIR. Teaches at MyDigitalSchool and Ynov Campus Lille. Specialises in TypeScript, React, React Native and interface animation. Available for freelance projects alongside his job. Contact: bpoulainpro@gmail.com or the contact page of this site.

Rules:
- Answer in the same language as the visitor's message.
- Two sentences maximum. This is a small chat bubble, not a document.
- Only discuss Baptiste, his work, and how to reach him. Politely decline anything else.
- Never invent rates, availability dates, client details or project specifics that are not listed above. Point the visitor at the contact page instead.
- Plain text only: no markdown, no lists, no emoji.`;

interface HistoryItem {
  from: "visitor" | "bot";
  text: string;
}

// Per-instance and therefore best-effort: serverless instances come and go.
// It blunts a casual flood, it is not a real rate limiter.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return new Response("Not configured", { status: 503 });

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return new Response("Slow down", { status: 429 });

  let prompt: string;
  let history: HistoryItem[];
  try {
    const body = await request.json();
    prompt = String(body.prompt ?? "").slice(0, MAX_PROMPT_LENGTH);
    history = Array.isArray(body.history)
      ? body.history.slice(-MAX_HISTORY)
      : [];
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  if (!prompt.trim()) return new Response("Empty prompt", { status: 400 });

  const contents = [
    ...history.map((m) => ({
      role: m.from === "visitor" ? "user" : "model",
      parts: [{ text: String(m.text).slice(0, MAX_PROMPT_LENGTH) }],
    })),
    { role: "user", parts: [{ text: prompt }] },
  ];

  const upstream = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: {
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          temperature: 0.7,
          // Gemini 3 thinks by default and bills those tokens against the
          // output budget, which truncates short answers mid-word.
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    },
  );

  if (!upstream.ok) {
    return new Response("Upstream error", { status: upstream.status });
  }

  const data = await upstream.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) return new Response("Empty reply", { status: 502 });

  return new Response(JSON.stringify({ text }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
