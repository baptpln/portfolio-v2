import {
  CloudFogIcon,
  CloudIcon,
  CloudLightningIcon,
  CloudRainIcon,
  CloudSunIcon,
  SnowflakeIcon,
  SunIcon,
} from "@phosphor-icons/react";

const LABELS: Record<number, string> = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Violent showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Severe thunderstorm",
};

const ICONS: Record<number, typeof SunIcon> = {
  0: SunIcon,
  1: CloudSunIcon,
  2: CloudSunIcon,
  3: CloudIcon,
  45: CloudFogIcon,
  48: CloudFogIcon,
  51: CloudRainIcon,
  53: CloudRainIcon,
  55: CloudRainIcon,
  61: CloudRainIcon,
  63: CloudRainIcon,
  65: CloudRainIcon,
  71: SnowflakeIcon,
  73: SnowflakeIcon,
  75: SnowflakeIcon,
  80: CloudRainIcon,
  81: CloudRainIcon,
  82: CloudRainIcon,
  95: CloudLightningIcon,
  96: CloudLightningIcon,
  99: CloudLightningIcon,
};

export function weatherLabel(code: number) {
  return LABELS[code] ?? "Unknown";
}

export function weatherIcon(code: number) {
  return ICONS[code] ?? CloudIcon;
}
