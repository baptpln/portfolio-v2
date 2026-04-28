import { motion } from "framer-motion";
import type { FC } from "react";

interface IsometricItemProps {
  className?: string;
  src: string;
  width?: number;
  height?: number;
}

export const IsometricItem: FC<IsometricItemProps> = ({
  className,
  src,
  width = 108,
  height = 108,
}) => {
  return (
    <motion.div
      className={`inline-flex ${className ?? ""}`}
      style={{ rotateZ: 45, scaleY: 0.6 }}
    >
      <img src={src} alt="" width={width} height={height} draggable={false} />
    </motion.div>
  );
};
