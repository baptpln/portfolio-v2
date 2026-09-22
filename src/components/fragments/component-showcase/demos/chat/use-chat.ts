import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { askGemini, isGeminiConfigured } from "./gemini";
import type { Message, ReplySource } from "./types";

/** Thinking beats, in ms. */
const THINKING_DELAY = 450;
const SCRIPTED_TYPING_MIN = 900;
const SCRIPTED_TYPING_PER_CHAR = 12;
const SCRIPTED_TYPING_MAX = 2200;
/** A real answer that arrives instantly still shows the dots this long. */
const MIN_TYPING_VISIBLE = 700;

/** Older messages are dropped so the panel never has to scroll far. */
const MAX_MESSAGES = 8;
/** How much history to send along for context. */
const HISTORY_SENT = 6;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function scriptedTypingTime(text: string) {
  return Math.min(
    SCRIPTED_TYPING_MAX,
    SCRIPTED_TYPING_MIN + text.length * SCRIPTED_TYPING_PER_CHAR,
  );
}

export function useChat() {
  const { t } = useTranslation();

  const suggestions = t("componentShowcase.cells.chat.suggestions", {
    returnObjects: true,
  }) as string[];
  const answers = t("componentShowcase.cells.chat.answers", {
    returnObjects: true,
  }) as string[];
  const fallbacks = t("componentShowcase.cells.chat.fallbacks", {
    returnObjects: true,
  }) as string[];

  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [source, setSource] = useState<ReplySource>(
    isGeminiConfigured ? "live" : "scripted",
  );

  const nextId = useRef(0);
  const fallbackIndex = useRef(0);
  const alive = useRef(true);
  const history = useRef<Message[]>([]);

  // A reply in flight must not touch state after the demo unmounts.
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const push = useCallback((from: Message["from"], text: string) => {
    const message = { id: nextId.current++, from, text };
    history.current = [...history.current, message].slice(-HISTORY_SENT);
    setMessages((prev) => [...prev, message].slice(-MAX_MESSAGES));
  }, []);

  /** The offline brain: exact suggestion matches, then cycling fallbacks. */
  const scriptedReply = useCallback(
    (text: string) => {
      const asked = suggestions.findIndex(
        (s) => s.toLowerCase() === text.toLowerCase(),
      );
      if (asked !== -1 && answers[asked]) return answers[asked];
      const reply = fallbacks[fallbackIndex.current % fallbacks.length];
      fallbackIndex.current += 1;
      return reply;
    },
    [suggestions, answers, fallbacks],
  );

  const send = useCallback(
    async (text: string) => {
      const prompt = text.trim();
      if (!prompt || typing) return;

      const context = history.current;
      push("visitor", prompt);

      await wait(THINKING_DELAY);
      if (!alive.current) return;
      setTyping(true);

      const startedAt = Date.now();
      let reply: string;
      let replySource: ReplySource = "live";

      try {
        reply = await askGemini(prompt, context);
      } catch {
        // 403, 429, timeout, empty answer, or simply no key configured —
        // every failure lands on the hand-written replies.
        reply = scriptedReply(prompt);
        replySource = "scripted";
        await wait(scriptedTypingTime(reply));
      }

      // Keep the dots up long enough to be read, however fast the answer was.
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_TYPING_VISIBLE)
        await wait(MIN_TYPING_VISIBLE - elapsed);

      if (!alive.current) return;
      setTyping(false);
      setSource(replySource);
      push("bot", reply);
    },
    [typing, push, scriptedReply],
  );

  return {
    messages,
    typing,
    suggestions,
    send,
    /** Where the last reply came from — useful for a debug badge. */
    source,
    isEmpty: messages.length === 0,
  };
}
