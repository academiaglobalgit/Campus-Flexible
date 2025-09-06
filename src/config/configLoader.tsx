import { loadConfig, saveConfig } from './configStorage';
import { fetchConfigFromApi } from './configService';

export const loadAppConfig = async () => {
  const stored = await loadConfig();
  if (stored) return stored;

  // Si no hay config en localStorage → llama API y guarda
  const freshConfig = await fetchConfigFromApi();
  await saveConfig(freshConfig);
  return freshConfig;
};