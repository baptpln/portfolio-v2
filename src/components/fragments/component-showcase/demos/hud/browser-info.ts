export interface BrowserInfo {
  timezone: string;
  language: string;
  platform: string;
  screen: string;
  cores: string;
}

function detectPlatform() {
  const ua = navigator.userAgent;
  if (/Mac/.test(ua)) return "macOS";
  if (/Win/.test(ua)) return "Windows";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad/.test(ua)) return "iOS";
  if (/Linux/.test(ua)) return "Linux";
  return "Unknown";
}

export function getBrowserInfo(): BrowserInfo {
  return {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    platform: detectPlatform(),
    screen: `${window.screen.width}×${window.screen.height}`,
    cores: navigator.hardwareConcurrency
      ? `${navigator.hardwareConcurrency}`
      : "—",
  };
}
