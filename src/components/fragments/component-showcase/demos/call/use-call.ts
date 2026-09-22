import { useCallback, useEffect, useRef, useState } from "react";

type CallStatus = "ringing" | "connecting" | "active" | "denied" | "ended";

export function useCall() {
  const [status, setStatus] = useState<CallStatus>("ringing");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setStream(null);
  }, []);

  const accept = useCallback(async () => {
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

  const decline = useCallback(() => {
    stopStream();
    setStatus("ended");
  }, [stopStream]);

  useEffect(() => stopStream, [stopStream]);

  return { status, stream, accept, decline };
}
