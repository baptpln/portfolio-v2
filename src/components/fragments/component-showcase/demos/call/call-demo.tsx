import { AnimatePresence } from "framer-motion";
import type { FC } from "react";
import { ActiveCall } from "./active-call";
import { CallEnded } from "./call-ended";
import { IncomingCall } from "./incoming-call";
import { useCall } from "./use-call";

export const CallDemo: FC = () => {
  const { status, stream, accept, decline } = useCall();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {status === "ringing" && (
          <IncomingCall key="incoming" onAccept={accept} onDecline={decline} />
        )}
        {(status === "connecting" || status === "active") && (
          <ActiveCall key="active" stream={stream} onEnd={decline} />
        )}
        {status === "denied" && <CallEnded key="denied" denied />}
        {status === "ended" && <CallEnded key="ended" />}
      </AnimatePresence>
    </div>
  );
};
