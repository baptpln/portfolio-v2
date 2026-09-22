import type { FC } from "react";

/**
 * Shown while the thread is empty. These double as the affordance: they are
 * what tells a visitor the panel is live rather than a screenshot.
 */
export const PromptSuggestions: FC<{
  suggestions: string[];
  onPick: (prompt: string) => void;
  disabled?: boolean;
}> = ({ suggestions, onPick, disabled }) => (
  <div className="flex flex-wrap gap-1.5 px-2 mb-2">
    {suggestions.map((s) => (
      <button
        key={s}
        type="button"
        disabled={disabled}
        onClick={() => onPick(s)}
        className="rounded-full border border-border px-2.5 py-1 font-heading text-xs text-muted-foreground transition-colors hover:border-foreground/25 hover:text-foreground disabled:opacity-50"
      >
        {s}
      </button>
    ))}
  </div>
);
