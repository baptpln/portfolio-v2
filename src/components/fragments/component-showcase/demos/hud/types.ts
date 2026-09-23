export type HudStatus = "idle" | "loading" | "ready" | "denied" | "error";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherReading {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  timezone: string;
  sunrise: string;
  sunset: string;
}
