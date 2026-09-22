import { motion } from "framer-motion";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

interface CallEndedProps {
  denied?: boolean;
}

export const CallEnded: FC<CallEndedProps> = ({ denied = false }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full w-full flex-col items-center justify-center gap-1 bg-card"
    >
      <p className="font-heading text-base font-medium">
        {denied
          ? t("componentShowcase.cells.call.denied")
          : t("componentShowcase.cells.call.ended")}
      </p>
    </motion.div>
  );
};
