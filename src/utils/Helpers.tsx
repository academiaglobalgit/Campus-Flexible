import { IMask } from "react-imask";

export const CustomMask = {
  phone: "(000) 000-0000",
  zip: "00000",
} as const;

type TypeMask = keyof typeof CustomMask | string;

export const formatWithIMask = (value: string, typeMask: TypeMask): string => {
  const mask = CustomMask[typeMask as keyof typeof CustomMask];

  if (!mask) {
    console.warn(`No mask found for typeMask "${typeMask}". Returning raw value.`);
    return value;
  }

  const iMask = IMask.createMask({
    mask,
  });

  iMask.resolve(value);

  return iMask.value;
};

export const numerosOrdinales = (numero: number) => {
  const ordinales = [
    "Primer",
    "Segundo",
    "Tercer",
    "Cuarto",
    "Quinto",
    "Sexto",
    "Séptimo",
    "Octavo",
    "Noveno",
    "Décimo",
    "Undécimo",
    "Duodécimo",
    "Decimotercero",
    "Decimocuarto",
    "Decimoquinto",
    "Decimosexto",
    "Decimoséptimo",
    "Decimoctavo",
    "Decimonoveno",
    "Vigésimo"
  ];

  return ordinales[numero - 1] || "";
};