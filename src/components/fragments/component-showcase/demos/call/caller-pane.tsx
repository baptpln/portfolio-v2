import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { ContactAvatar } from "./contact-avatar";
import type { Contact } from "./types";

interface CallerPaneProps {
  contact: Contact;
}

export const CallerPane: FC<CallerPaneProps> = ({ contact }) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-muted">
      <ContactAvatar contact={contact} size="lg" />
      <p className="text-sm text-muted-foreground">
        {t("componentShowcase.cells.call.connecting", { name: contact.name })}
      </p>
    </div>
  );
};
