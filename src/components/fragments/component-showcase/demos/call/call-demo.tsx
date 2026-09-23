import { AnimatePresence } from "framer-motion";
import type { FC } from "react";
import { ActiveCall } from "./active-call";
import { CallEnded } from "./call-ended";
import { getContacts } from "./contacts";
import { IncomingCall } from "./incoming-call";
import { useCall } from "./use-call";

const [baptiste] = getContacts();

export const CallDemo: FC = () => {
  const { status, contact, stream, accept, end, callBack } = useCall(baptiste);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {status === "incoming" && (
          <IncomingCall
            key="incoming"
            contact={contact}
            onAccept={accept}
            onDecline={end}
          />
        )}
        {(status === "connecting" || status === "active") && (
          <ActiveCall
            key="active"
            contact={contact}
            stream={stream}
            onEnd={end}
          />
        )}
        {status === "denied" && (
          <CallEnded
            key="denied"
            contact={contact}
            denied
            onCallBack={callBack}
          />
        )}
        {status === "ended" && (
          <CallEnded key="ended" contact={contact} onCallBack={callBack} />
        )}
      </AnimatePresence>
    </div>
  );
};
