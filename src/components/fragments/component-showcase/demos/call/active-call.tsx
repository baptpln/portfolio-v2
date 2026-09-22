import { motion } from "framer-motion";
import { PhoneDisconnectIcon } from "@phosphor-icons/react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { CallerPane } from "./caller-pane";
import { CameraPane } from "./camera-pane";
import { Button } from "@/components/ui/button";

interface ActiveCallProps {
  stream: MediaStream | null;
  onEnd: () => void;
}

export const ActiveCall: FC<ActiveCallProps> = ({ stream, onEnd }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex h-full w-full"
    >
      <CallerPane />
      <CameraPane stream={stream} />

      <Button
        size="icon-lg"
        type="button"
        onClick={onEnd}
        variant="destructive"
        className="rounded-full hover:scale-105 active:scale-95 absolute bottom-4 left-1/2 flex h-11 w-11 -translate-x-1/2"
        aria-label={t("componentShowcase.cells.call.end")}
      >
        <PhoneDisconnectIcon className="h-5 w-5" />
      </Button>
    </motion.div>
  );
};
