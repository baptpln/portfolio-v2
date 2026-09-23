export function getGpuRenderer(): string {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return "Unavailable";

    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (!ext) return "Unavailable";

    return String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL));
  } catch {
    return "Unavailable";
  }
}

export async function getStorageQuota(): Promise<string> {
  if (!navigator.storage?.estimate) return "Unavailable";

  try {
    const { quota } = await navigator.storage.estimate();
    if (!quota) return "Unavailable";
    return `${(quota / 1024 ** 3).toFixed(1)} GB`;
  } catch {
    return "Unavailable";
  }
}
