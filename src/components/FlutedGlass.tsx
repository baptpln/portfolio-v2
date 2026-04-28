import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type FlutedGlassProps = {
  backgroundImage: string;
  active?: boolean;
  paneSize?: number;
  numOfPanes?: number;
  activeOnHover?: boolean;
  blurAmount?: number;
  paneJustify?: "start" | "end";
  stretchPercentage?: number;
  animationMs?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const FlutedGlass = ({
  backgroundImage,
  active = false,
  paneSize = 50,
  numOfPanes = 10,
  paneJustify = "start",
  activeOnHover,
  blurAmount = 5,
  stretchPercentage = 0,
  animationMs = 50,
  className,
  ...props
}: FlutedGlassProps) => {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [blurryUrl, setBlurryUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const blurryUrlRef = useRef<string | null>(null);

  const singlePaneWidth = useMemo(() => {
    return 100 / numOfPanes;
  }, [numOfPanes]);

  // Observe image size changes and update dimensions
  useEffect(() => {
    if (!imageRef || !imageLoaded) return;

    const updateDimensions = () => {
      const rect = imageRef.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    // Set initial dimensions
    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(imageRef);

    return () => {
      resizeObserver.disconnect();
    };
  }, [imageRef, imageLoaded]);

  // Reset when image source changes
  useEffect(() => {
    setImageLoaded(false);
    setDimensions(null);
    if (blurryUrlRef.current) {
      URL.revokeObjectURL(blurryUrlRef.current);
      blurryUrlRef.current = null;
      setBlurryUrl(null);
    }
  }, [backgroundImage]);

  // Create blurred image when dimensions are available
  useEffect(() => {
    if (!imageRef || !canvasRef || !imageLoaded || !dimensions) return;

    const canvas = canvasRef;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = `blur(${blurAmount}px)`;
    ctx.drawImage(imageRef, 0, 0, dimensions.width, dimensions.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      if (blurryUrlRef.current) {
        URL.revokeObjectURL(blurryUrlRef.current);
      }
      const imageUrl = URL.createObjectURL(blob);
      blurryUrlRef.current = imageUrl;
      setBlurryUrl(imageUrl);
    });
  }, [imageLoaded, imageRef, canvasRef, dimensions, blurAmount]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (blurryUrlRef.current) {
        URL.revokeObjectURL(blurryUrlRef.current);
      }
    };
  }, []);

  /**
   * Calculate the background position of each pane
   * based on the pane size and the number of panes as well as the justify prop
   */
  const calculatePaneBackgroundPos = useCallback(
    (i: number) => {
      if (paneJustify === "start") {
        return `${(i * singlePaneWidth) / (100 / paneSize)}%`;
      }
      return `${100 - paneSize + (i * singlePaneWidth) / (100 / paneSize)}%`;
    },
    [paneJustify, singlePaneWidth, paneSize],
  );

  /**
   * The width of the background image is the number of panes * 100%
   */
  const backgroundSizeWidth = useMemo(() => {
    return numOfPanes * (100 - stretchPercentage);
  }, [numOfPanes, stretchPercentage]);

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden",
        paneJustify === "start" ? "justify-start" : "justify-end",
        activeOnHover && "group",
        className,
      )}
      {...props}
    >
      <img
        onLoad={() => setImageLoaded(true)}
        ref={setImageRef}
        src={backgroundImage}
        alt=""
        className="w-full h-full object-cover"
      />
      {imageLoaded && dimensions && (
        <>
          <canvas ref={setCanvasRef} className="hidden" />
          <div
            className="absolute top-0 flex h-full overflow-hidden"
            style={{ width: `${paneSize}%` }}
          >
            {blurryUrl &&
              Array(numOfPanes)
                .fill(0)
                .map((_, i) => i)
                .map((i) => (
                  <div
                    key={`pane-${i}`}
                    className={cn(
                      "relative -top-[10%] h-[120%] flex-1 bg-no-repeat transition-transform ease-in-out",
                      active && "[transform:perspective(200px)_rotateY(12deg)]",
                      activeOnHover &&
                        "group-hover:[transform:perspective(200px)_rotateY(12deg)]",
                      !active &&
                        !activeOnHover &&
                        "[transform:perspective(100px)_rotateY(90deg)]",
                      !active &&
                        activeOnHover &&
                        "[transform:perspective(100px)_rotateY(90deg)]",
                    )}
                    style={{
                      backgroundImage: `url(${blurryUrl})`,
                      backgroundSize: `${backgroundSizeWidth}% 100%`,
                      backgroundPosition: `${calculatePaneBackgroundPos(i)} center`,
                      transitionDuration: `${animationMs}ms`,
                    }}
                  />
                ))}
          </div>
        </>
      )}
    </div>
  );
};
