import { motion } from "framer-motion";
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
    <motion.video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      initial={{ opacity: 0, scale: 0.8, x: 16, y: -16 }}
      animate={
        stream
          ? { opacity: 1, scale: 1, x: 0, y: 0 }
          : { opacity: 0, scale: 0.8, x: 16, y: -16 }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="object-cover absolute right-3 top-3 h-24 w-20 overflow-hidden rounded-lg border border-foreground shadow-lg"
    />
  );
};
