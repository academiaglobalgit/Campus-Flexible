import { AppRoutingPaths } from "@constants";
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

export const ShowBackMenuRoutes = [
    `${AppRoutingPaths.CURSOS_ACTIVOS_DETALLES.replace("/:id","")}`,
    AppRoutingPaths.PLAN_ESTUDIO_INFORMACION,
    AppRoutingPaths.VIDEOTECA_DETALLE,
    AppRoutingPaths.CALIFICACIONES_DETALLE.replace("/:id",""),
];

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

export const toRoman = (num: number): string => {
  const romans: { value: number; numeral: string }[] = [
    { value: 12, numeral: "XII" },
    { value: 11, numeral: "XI" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 8, numeral: "VIII" },
    { value: 7, numeral: "VII" },
    { value: 6, numeral: "VI" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 3, numeral: "III" },
    { value: 2, numeral: "II" },
    { value: 1, numeral: "I" },
  ];

  let result = "";
  for (const { value, numeral } of romans) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
};