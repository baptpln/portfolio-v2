import { LandingHero } from "@/components/landing-hero";
// import { PortraitWave } from "@/components/wave/portrait-wave"; // archived
import { TrustedBySection } from "@/components/fragments/trusted-by-section";
import { CraftSection } from "@/components/fragments/craft-section";
import { AnimationShowcase } from "@/components/fragments/animation-showcase";
import { IsometricConveyor } from "@/components/isometric/isometric-conveyor";
import { DynamicIslandNavbar } from "@/components/dynamic-island/dynamic-island-navbar";

export function Home() {
  return (
    <>
      <DynamicIslandNavbar />

      <div className="flex flex-col mt-28 lg:mt-40 w-full overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
          {/* Left Column - Content */}
          <div className="flex items-center justify-center lg:justify-start w-full">
            <LandingHero />
            {/*<button onClick={() => trigger("success")}>Tap me</button>*/}
          </div>

          {/* Right Column - Isometric animation */}
          <div className=" lg:flex flex-col items-center justify-center p-8">
            <IsometricConveyor hero />
          </div>
        </div>

        <TrustedBySection />

        <CraftSection />

        {/* IsometricConveyor archived from standalone section — now lives in hero */}

        <AnimationShowcase />
      </div>
    </>
  );
}
