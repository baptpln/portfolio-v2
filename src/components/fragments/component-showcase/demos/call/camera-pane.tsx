import type { FC } from "react";
import { useEffect, useRef } from "react";

interface CameraPaneProps {
  stream: MediaStream | null;
}

export const CameraPane: FC<CameraPaneProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div
      className={`relative w-full overflow-hidden ${stream ? "bg-black" : "bg-muted"}`}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-full w-full scale-x-[-1] object-cover"
      />
    </div>
  );
};
