import { motion } from "framer-motion";
import { PhoneDisconnectIcon, PhoneIcon } from "@phosphor-icons/react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface IncomingCallProps {
  onAccept: () => void;
  onDecline: () => void;
}

export const IncomingCall: FC<IncomingCallProps> = ({
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
        <p className="font-heading text-base font-medium">
          {t("componentShowcase.cells.call.caller")}
        </p>
        <p className="text-sm text-muted-foreground">
          {t("componentShowcase.cells.call.ringing")}
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
