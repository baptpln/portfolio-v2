import { useCallback, useEffect, useRef } from "react";

/** How close to the bottom still counts as "at the bottom", in px. */
const THRESHOLD = 24;

/**
 * Keeps a scroll container pinned to its last message.
 *
 * Driven by size rather than by state: a bubble keeps growing while its spring
 * animation plays, so a one-shot scroll on render always lands short. Scrolling
 * up releases the pin so an arriving reply can't yank you away mid-sentence.
 */
export function useStickToBottom<
  S extends HTMLElement,
  C extends HTMLElement,
>() {
  const scroller = useRef<S>(null);
  const content = useRef<C>(null);
  const stuck = useRef(true);

  useEffect(() => {
    const el = scroller.current;
    const inner = content.current;
    if (!el || !inner) return;

    const pin = () => {
      if (stuck.current) el.scrollTop = el.scrollHeight;
    };

    const observer = new ResizeObserver(pin);
    observer.observe(inner);

    const onScroll = () => {
      stuck.current =
        el.scrollHeight - el.clientHeight - el.scrollTop < THRESHOLD;
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  /** Re-arms the pin — call it when the visitor sends something. */
  const stickNow = useCallback(() => {
    stuck.current = true;
  }, []);

  return { scroller, content, stickNow };
}
