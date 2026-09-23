import { motion } from "framer-motion";
import { PhoneDisconnectIcon, PhoneIcon } from "@phosphor-icons/react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ContactAvatar } from "./contact-avatar";
import type { Contact } from "./types";

interface IncomingCallProps {
  contact: Contact;
  onAccept: () => void;
  onDecline: () => void;
}

export const IncomingCall: FC<IncomingCallProps> = ({
  contact,
  onAccept,
  onDecline,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full w-full flex-col items-center justify-between bg-card px-6 py-8"
    >
      <div className="flex flex-col items-center gap-3">
        <ContactAvatar contact={contact} size="lg" />
        <p className="font-heading text-base font-medium">
          {t("componentShowcase.cells.call.ringing", { name: contact.name })}
        </p>
      </div>

      <div className="flex items-center gap-20">
        <div className="flex flex-col items-center gap-1.5">
          <Button
            size="icon-lg"
            type="button"
            onClick={onDecline}
            variant="destructive"
            className="rounded-full hover:scale-105 active:scale-95 h-11 w-11"
            aria-label={t("componentShowcase.cells.call.decline")}
          >
            <PhoneDisconnectIcon className="h-5 w-5" />
          </Button>
          <p className="text-xs text-muted-foreground">
            {t("componentShowcase.cells.call.decline")}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Button
            size="icon-lg"
            type="button"
            onClick={onAccept}
            className="rounded-full hover:scale-105 active:scale-95 h-11 w-11"
            aria-label={t("componentShowcase.cells.call.accept")}
          >
            <PhoneIcon className="h-5 w-5" />
          </Button>
          <p className="text-xs text-muted-foreground">
            {t("componentShowcase.cells.call.accept")}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
