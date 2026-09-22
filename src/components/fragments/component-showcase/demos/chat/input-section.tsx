import { ArrowUp } from "@phosphor-icons/react";
import { useState, type FC, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MAX_LENGTH = 140;

export const InputSection: FC<{
  onSend: (text: string) => void;
  disabled?: boolean;
}> = ({ onSend, disabled }) => {
  const { t } = useTranslation();
  const [draft, setDraft] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || disabled) return;
    onSend(draft);
    setDraft("");
  };

  const placeholder = t("componentShowcase.cells.chat.placeholder");

  return (
    <form onSubmit={submit} className="flex items-center gap-2 px-2 pb-2 z-10">
      <Input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        maxLength={MAX_LENGTH}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!draft.trim() || disabled}
        aria-label={t("componentShowcase.cells.chat.send")}
      >
        <ArrowUp />
      </Button>
    </form>
  );
};
