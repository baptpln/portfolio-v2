import { useCallback, useEffect, useRef, useState } from "react";
import type { Contact } from "./types";

type CallStatus = "incoming" | "connecting" | "active" | "denied" | "ended";

export function useCall(initialContact: Contact) {
  const [status, setStatus] = useState<CallStatus>("incoming");
  const [contact, setContact] = useState<Contact>(initialContact);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setStream(null);
  }, []);

  const requestCamera = useCallback(async () => {
    setStatus("connecting");
    try {
      const media = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      streamRef.current = media;
      setStream(media);
      setStatus("active");
    } catch {
      setStatus("denied");
    }
  }, []);

  /** Answering the incoming ring. */
  const accept = useCallback(() => {
    void requestCamera();
  }, [requestCamera]);

  /** Hanging up, whether ringing, mid-call, or declining. */
  const end = useCallback(() => {
    stopStream();
    setStatus("ended");
  }, [stopStream]);

  /** Calling a contact back from the recents list — straight to the call screen. */
  const callBack = useCallback(
    (next: Contact) => {
      setContact(next);
      void requestCamera();
    },
    [requestCamera],
  );

  useEffect(() => stopStream, [stopStream]);

  return { status, contact, stream, accept, end, callBack };
}
