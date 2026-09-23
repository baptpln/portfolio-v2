import { useEffect, useState } from "react";
import { getGpuRenderer, getStorageQuota } from "./device-info";

export function useDeviceInfo() {
  const [gpu] = useState(getGpuRenderer);
  const [storageQuota, setStorageQuota] = useState("—");

  useEffect(() => {
    getStorageQuota().then(setStorageQuota);
  }, []);

  return { gpu, storageQuota };
}
