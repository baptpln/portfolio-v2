import { FlutedGlass } from "@/components/FlutedGlass";
import { useState } from "react";

export const ImageGenerator = () => {
  const [backgroundImage, setBackgroundImage] = useState("/gradient-2.jpg");
  const [numOfPanes, setNumOfPanes] = useState(30);
  const [blurAmount, setBlurAmount] = useState(80);
  const [stretchPercentage, setStretchPercentage] = useState(75);

  return (
    <div
      style={{
        backgroundColor: "#18181b",
        minHeight: "100vh",
        padding: "32px",
      }}
    >
      <div style={{ maxWidth: "1800px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "32px",
          }}
        >
          Fluted Glass Image Generator - 1600x1000
        </h1>

        {/* Controls */}
        <div
          style={{
            backgroundColor: "#27272a",
            borderRadius: "8px",
            padding: "24px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "white",
                  marginBottom: "8px",
                }}
              >
                Background Image Path
              </label>
              <input
                type="text"
                value={backgroundImage}
                onChange={(e) => setBackgroundImage(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  backgroundColor: "#3f3f46",
                  color: "white",
                  borderRadius: "6px",
                  border: "none",
                }}
                placeholder="/gradient.jpg"
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "white",
                  marginBottom: "8px",
                }}
              >
                Number of Panes: {numOfPanes}
              </label>
              <input
                type="range"
                min="5"
                max="100"
                value={numOfPanes}
                onChange={(e) => setNumOfPanes(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "white",
                  marginBottom: "8px",
                }}
              >
                Blur Amount: {blurAmount}px
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={blurAmount}
                onChange={(e) => setBlurAmount(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "white",
                  marginBottom: "8px",
                }}
              >
                Stretch Percentage: {stretchPercentage}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={stretchPercentage}
                onChange={(e) => setStretchPercentage(Number(e.target.value))}
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <p style={{ color: "#a1a1aa", fontSize: "14px", marginTop: "16px" }}>
            💡 Adjust settings and screenshot the preview below. Use browser dev
            tools or CMD+SHIFT+4 on Mac.
          </p>
        </div>

        {/* Full Size Preview - NO SCALING */}
        <div
          style={{
            backgroundColor: "#000000",
            padding: "0",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "1600px",
              height: "1000px",
              backgroundColor: "#000000",
            }}
          >
            <FlutedGlass
              backgroundImage={backgroundImage}
              active={true}
              paneSize={100}
              numOfPanes={numOfPanes}
              blurAmount={blurAmount}
              stretchPercentage={stretchPercentage}
              animationMs={0}
              className=""
              style={{
                width: "1600px",
                height: "1000px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
