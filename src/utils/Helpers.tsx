import { IMask } from "react-imask";

export const formatWithIMask = (value: string, customMask: string): string => {
  const mask = IMask.createMask({
    mask: customMask, // Máscara deseada
  });
  mask.resolve(value); // Aplica la máscara
  return mask.value; // Devuelve el valor formateado
};