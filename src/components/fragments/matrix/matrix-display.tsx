import { cn } from "@/lib/utils";
import { useState, useEffect, type FC } from "react";

const matrixProps = {
  dotSize: "h-1 w-1",
  spacing: "gap-0.5",
  speed: 2, // frames per second
  onColor: "bg-white",
  offColor: "bg-white/10",
  className: "",
};

export type MatrixDisplayProps = {
  matrices: number[][][];
} & Partial<typeof matrixProps>;

export const MatrixDisplay: FC<MatrixDisplayProps> = (props) => {
  const { matrices, dotSize, spacing, speed, onColor, offColor, className } = {
    ...matrixProps,
    ...props,
  };

  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!matrices || matrices.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % matrices.length);
    }, 1000 / speed);

    return () => clearInterval(intervalId);
  }, [matrices, speed]);

  const matrix = matrices[currentFrame] || [];

  const getCellColor = (cell: number) => {
    if (cell === 2) return "transparent";
    if (cell === 0) return offColor;
    if (cell === 1) return onColor;
  };

  return (
    <div
      className={cn(
        "w-fit h-fit flex flex-col items-center justify-center",
        className,
        spacing,
      )}
    >
      {matrix.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={cn(
            "w-fit h-fit flex items-center justify-center",
            spacing,
          )}
        >
          {row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={cn("rounded-full", dotSize, getCellColor(cell))}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
