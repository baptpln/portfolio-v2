import { useCallback, useState } from "react";
import type { Coordinates, HudStatus, WeatherReading } from "./types";

async function fetchWeather(coords: Coordinates): Promise<WeatherReading> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", coords.latitude.toString());
  url.searchParams.set("longitude", coords.longitude.toString());
  url.searchParams.set("current", "temperature_2m,weather_code,wind_speed_10m");
  url.searchParams.set("daily", "sunrise,sunset");
  url.searchParams.set("timezone", "auto");

  const res = await fetch(url);
  if (!res.ok) throw new Error("weather request failed");
  const data = await res.json();

  return {
    temperature: data.current.temperature_2m,
    windSpeed: data.current.wind_speed_10m,
    weatherCode: data.current.weather_code,
    timezone: data.timezone,
    sunrise: data.daily.sunrise[0],
    sunset: data.daily.sunset[0],
  };
}

export function useHud() {
  const [status, setStatus] = useState<HudStatus>("idle");
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [weather, setWeather] = useState<WeatherReading | null>(null);

  const requestAccess = useCallback(() => {
    setStatus("loading");
    setWeather(null);

    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const next = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCoords(next);

        fetchWeather(next)
          .then((reading) => {
            setWeather(reading);
            setStatus("ready");
          })
          .catch(() => setStatus("error"));
      },
      (error) => {
        setStatus(error.code === error.PERMISSION_DENIED ? "denied" : "error");
      },
    );
  }, []);

  return { status, coords, weather, requestAccess };
}
