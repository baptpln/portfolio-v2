import { motion } from "framer-motion";
import { PhoneIcon } from "@phosphor-icons/react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ContactAvatar } from "./contact-avatar";
import { getContacts } from "./contacts";
import type { Contact } from "./types";
import { cn } from "@/lib/utils";

interface CallEndedProps {
  contact: Contact;
  denied?: boolean;
  onCallBack: (contact: Contact) => void;
}

export const CallEnded: FC<CallEndedProps> = ({
  contact,
  denied = false,
  onCallBack,
}) => {
  const { t } = useTranslation();

  const recents = getContacts().filter((c) => c.name !== contact.name);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full w-full flex-col bg-background"
    >
      <div className="flex-1 overflow-scroll overscroll-y-none">
        <div className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md px-4 h-12 flex items-center">
          <p className="font-heading text-sm font-semibold">
            {t("componentShowcase.cells.call.recents")}
          </p>
        </div>
        <div className="flex items-center gap-3 border-b border-border/60 px-4 py-2.5">
          <ContactAvatar contact={contact} />
          <span className="min-w-0 flex-1 truncate text-sm">
            {contact.name}
          </span>
          <span className="shrink-0 text-xs text-muted-foreground">
            {denied
              ? t("componentShowcase.cells.call.denied")
              : t("componentShowcase.cells.call.ended")}
          </span>
          <Button
            type="button"
            variant="default"
            size="icon-sm"
            onClick={() => onCallBack(contact)}
            aria-label={t("componentShowcase.cells.call.callBack")}
            className="h-7 w-7 shrink-0"
          >
            <PhoneIcon className="h-4 w-4" />
          </Button>
        </div>

        {recents.map((recent, index) => (
          <div
            key={recent.name}
            className={cn("flex items-center gap-3 px-4 py-2.5", {
              "border-b border-border": index !== recents.length - 1,
            })}
          >
            <ContactAvatar contact={recent} />
            <span className="min-w-0 flex-1 truncate text-sm">
              {recent.name}
            </span>
            <Button
              type="button"
              variant="default"
              size="icon-sm"
              onClick={() => onCallBack(recent)}
              aria-label={t("componentShowcase.cells.call.callBack")}
              className="h-7 w-7 shrink-0"
            >
              <PhoneIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
