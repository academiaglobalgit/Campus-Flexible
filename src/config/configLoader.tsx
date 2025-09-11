import { loadConfig, saveConfig } from './configStorage';
import { fetchConfigFromApi } from './configService';

export const loadAppConfig = async () => {
  // Si no hay config en localStorage → llama API y guarda
  const freshConfig = await fetchConfigFromApi();
  await saveConfig(freshConfig);
  return freshConfig;
};

export const getCurrentConfig = async () => {
  return await loadConfig();
};