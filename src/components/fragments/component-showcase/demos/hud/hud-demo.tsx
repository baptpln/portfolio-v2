import { AnimatePresence, motion } from "framer-motion";
import {
  CircleNotchIcon,
  ClockIcon,
  CpuIcon,
  DesktopIcon,
  GlobeIcon,
  GraphicsCardIcon,
  HardDrivesIcon,
  MapPinIcon,
  MonitorIcon,
  TranslateIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { getBrowserInfo } from "./browser-info";
import { HudPanel } from "./hud-panel";
import { useDeviceInfo } from "./use-device-info";
import { useHud } from "./use-hud";
import { useLocalTime } from "./use-local-time";
import { weatherIcon, weatherLabel } from "./weather-codes";

interface PanelConfig {
  captionKey: string;
  value: ReactNode;
  icon: ReactNode;
  size?: "sm" | "md" | "lg";
}

export const HudDemo: FC = () => {
  const { t } = useTranslation();
  const [browserInfo] = useState(getBrowserInfo);
  const { gpu, storageQuota } = useDeviceInfo();
  const { status, coords, weather, requestAccess } = useHud();
  const localTime = useLocalTime(browserInfo.timezone);

  useEffect(() => {
    const nav = navigator as Navigator & Record<string, unknown>;
    console.log("navigator snapshot", {
      userAgent: nav.userAgent,
      platform: nav.platform,
      language: nav.language,
      languages: nav.languages,
      vendor: nav.vendor,
      product: nav.product,
      cookieEnabled: nav.cookieEnabled,
      onLine: nav.onLine,
      doNotTrack: nav.doNotTrack,
      hardwareConcurrency: nav.hardwareConcurrency,
      maxTouchPoints: nav.maxTouchPoints,
      deviceMemory: nav.deviceMemory,
      pdfViewerEnabled: nav.pdfViewerEnabled,
      webdriver: nav.webdriver,
      userAgentData: nav.userAgentData,
      connection: nav.connection,
    });
    console.log("screen snapshot", {
      width: screen.width,
      height: screen.height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
      orientation: screen.orientation?.type,
      devicePixelRatio: window.devicePixelRatio,
    });
    console.log("browserInfo", browserInfo);
  }, [browserInfo]);

  useEffect(() => {
    if (coords && weather) console.log("geo + weather", { coords, weather });
  }, [coords, weather]);

  const mainPanels: PanelConfig[] = [
    {
      captionKey: "timezone",
      value: browserInfo.timezone,
      icon: <GlobeIcon className="h-3 w-3" />,
    },
    {
      captionKey: "localTime",
      value: localTime ?? "—",
      icon: <ClockIcon className="h-3 w-3" />,
    },
    {
      captionKey: "language",
      value: browserInfo.language,
      icon: <TranslateIcon className="h-3 w-3" />,
    },
    {
      captionKey: "screen",
      value: browserInfo.screen,
      icon: <MonitorIcon className="h-3 w-3" />,
    },
    {
      captionKey: "storage",
      value: storageQuota,
      icon: <HardDrivesIcon className="h-3 w-3" />,
    },
  ];

  const devicePanels: PanelConfig[] = [
    {
      captionKey: "platform",
      value: browserInfo.platform,
      icon: <DesktopIcon className="h-3 w-3" />,
    },
    {
      captionKey: "gpu",
      value: gpu,
      icon: <GraphicsCardIcon className="h-3 w-3" />,
      size: "lg",
    },
    {
      captionKey: "cores",
      value: browserInfo.cores,
      icon: <CpuIcon className="h-3 w-3" />,
      size: "sm",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-border">
      <div className="flex flex-1 flex-wrap content-start gap-px overflow-hidden">
        {mainPanels.map((panel, i) => (
          <HudPanel
            key={panel.captionKey}
            index={i}
            icon={panel.icon}
            caption={t(`componentShowcase.cells.hud.${panel.captionKey}`)}
            value={panel.value}
          />
        ))}

        <div className="w-full basis-full flex flex-wrap gap-px bg-border">
          {devicePanels.map((panel, i) => (
            <HudPanel
              key={panel.captionKey}
              index={mainPanels.length + i}
              icon={panel.icon}
              size={panel.size}
              caption={t(`componentShowcase.cells.hud.${panel.captionKey}`)}
              value={panel.value}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full basis-full flex flex-col items-start justify-center gap-2 bg-background px-2.5 py-2"
            >
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPinIcon className="h-3.5 w-3.5 text-primary" />
                {t("componentShowcase.cells.hud.idlePrompt")}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={requestAccess}
                className="h-6 text-[11px]"
              >
                {t("componentShowcase.cells.hud.getReadout")}
              </Button>
            </motion.div>
          )}

          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full basis-full flex items-center justify-center gap-2 bg-background px-2.5 py-2 text-xs text-muted-foreground"
            >
              <CircleNotchIcon className="h-3.5 w-3.5 animate-spin" />
              {t("componentShowcase.cells.hud.acquiring")}
            </motion.div>
          )}

          {(status === "denied" || status === "error") && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full basis-full flex flex-col items-start justify-center gap-2 bg-background px-2.5 py-2"
            >
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <WarningCircleIcon className="h-3.5 w-3.5 text-destructive" />
                {status === "denied"
                  ? t("componentShowcase.cells.hud.denied")
                  : t("componentShowcase.cells.hud.signalLost")}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={requestAccess}
                className="h-6 text-[11px]"
              >
                {t("componentShowcase.cells.hud.retry")}
              </Button>
            </motion.div>
          )}

          {status === "ready" && coords && weather && (
            <motion.div
              key="ready"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full basis-full flex flex-wrap gap-px bg-border"
            >
              <HudPanel
                index={mainPanels.length + devicePanels.length}
                caption={t("componentShowcase.cells.hud.coordinates")}
                value={`${coords.latitude.toFixed(2)}, ${coords.longitude.toFixed(2)}`}
              />
              <HudPanel
                index={mainPanels.length + devicePanels.length + 1}
                caption={t("componentShowcase.cells.hud.condition")}
                value={
                  <span className="flex items-center gap-1.5">
                    {(() => {
                      const Icon = weatherIcon(weather.weatherCode);
                      return <Icon className="h-4 w-4 text-primary" />;
                    })()}
                    {weatherLabel(weather.weatherCode)}
                  </span>
                }
              />
              <HudPanel
                index={mainPanels.length + devicePanels.length + 2}
                caption={t("componentShowcase.cells.hud.tempWind")}
                value={`${weather.temperature}°C · ${weather.windSpeed}km/h`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
