import { encryptData, decryptData } from '../utils/crypto';


const getConfigKey = () => {
  const host = window.location.hostname;

  if (host === "localhost") {
    return "appConfig_local";
  }
  
  const parts = host.split(".");
  const subdomain = parts.length > 2 ? parts[0] : "root";

  return `appConfig_${subdomain}`;
};

export const CONFIG_KEY = getConfigKey();

export const saveConfig = async (config: any) => {
  const encrypted = await encryptData(config);
  localStorage.setItem(CONFIG_KEY, encrypted);
};

export const loadConfig = async (): Promise<any | null> => {
  const stored = localStorage.getItem(CONFIG_KEY);
  if (!stored) return null;
  try {
    return await decryptData(stored);
  } catch (err) {
    console.error("Error desencriptando config:", err);
    return null;
  }
};