import type { Message } from "./types";

/**
 * Two ways to reach Gemini, in order of preference:
 *
 * 1. `VITE_CHAT_ENDPOINT` — a serverless proxy (see `api/chat.ts`) that holds
 *    the key server-side. Nothing secret ships to the browser.
 * 2. `VITE_GEMINI_API_KEY` — a direct browser call. Convenient for local work,
 *    but Vite inlines env vars into the bundle, so the key becomes public the
 *    moment the site is deployed. Only use a key that is restricted and
 *    quota-capped.
 *
 * With neither set, `askGemini` throws immediately and the caller falls back
 * to the scripted replies.
 */
const ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT as string | undefined;
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

const MODEL = "gemini-3.6-flash";
const TIMEOUT_MS = 8000;
/** Generous enough that a two-sentence answer never cuts mid-word. */
const MAX_OUTPUT_TOKENS = 320;

export const isGeminiConfigured = Boolean(ENDPOINT || API_KEY);

const SYSTEM_PROMPT = `You are the assistant embedded in Baptiste Poulain's portfolio site.

About Baptiste: frontend engineer at SFEIR, currently working on L'Oréal GPT for L'Oréal. Previously fullstack developer for Decathlon and Adeo through SFEIR. Teaches at MyDigitalSchool and Ynov Campus Lille. Specialises in TypeScript, React, React Native and interface animation. Available for freelance projects alongside his job. Contact: bpoulainpro@gmail.com or the contact page of this site.

Rules:
- Answer in the same language as the visitor's message.
- Two sentences maximum. This is a small chat bubble, not a document.
- Only discuss Baptiste, his work, and how to reach him. Politely decline anything else.
- Never invent rates, availability dates, client details or project specifics that are not listed above. Point the visitor at the contact page instead.
- Plain text only: no markdown, no lists, no emoji.`;

function withTimeout() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  return { signal: controller.signal, done: () => clearTimeout(timer) };
}

/** Message history in the shape the Gemini REST API expects. */
function toContents(history: Message[], prompt: string) {
  return [
    ...history.map((m) => ({
      role: m.from === "visitor" ? "user" : "model",
      parts: [{ text: m.text }],
    })),
    { role: "user", parts: [{ text: prompt }] },
  ];
}

async function callProxy(
  prompt: string,
  history: Message[],
  signal: AbortSignal,
) {
  const response = await fetch(ENDPOINT as string, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, history }),
    signal,
  });
  if (!response.ok) throw new Error(`Proxy responded ${response.status}`);
  const data = await response.json();
  return data.text as string | undefined;
}

async function callGoogle(
  prompt: string,
  history: Message[],
  signal: AbortSignal,
) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: toContents(history, prompt),
      generationConfig: {
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: 0.7,
        // Gemini 3 thinks by default and bills those tokens against the
        // output budget, which truncates short answers mid-word.
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
    signal,
  });

  // 403 (bad or restricted key), 429 (quota) and 5xx all land here, and the
  // caller treats every one of them the same way: use a scripted reply.
  if (!response.ok) throw new Error(`Gemini responded ${response.status}`);

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined;
}

/** Resolves with a reply, or throws so the caller can fall back. */
export async function askGemini(
  prompt: string,
  history: Message[],
): Promise<string> {
  if (!isGeminiConfigured) throw new Error("Gemini is not configured");

  const { signal, done } = withTimeout();
  try {
    const text = ENDPOINT
      ? await callProxy(prompt, history, signal)
      : await callGoogle(prompt, history, signal);

    const trimmed = text?.trim();
    if (!trimmed) throw new Error("Gemini returned an empty reply");
    return trimmed;
  } finally {
    done();
  }
}
