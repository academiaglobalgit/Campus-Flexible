import { encryptData, decryptData } from '../utils/crypto';

export const CONFIG_KEY = 'appConfig';

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