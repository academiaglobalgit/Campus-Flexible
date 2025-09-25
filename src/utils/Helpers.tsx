import { AppRoutingPaths } from "@constants";
import { IMask } from "react-imask";
import { format } from 'date-fns';

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
    AppRoutingPaths.CURSOS_ACTIVOS_DETALLES.replace("/:id",""),
    AppRoutingPaths.PLAN_ESTUDIO_INFORMACION.replace("/:id",""),
    AppRoutingPaths.VIDEOTECA_DETALLE,
    AppRoutingPaths.CALIFICACIONES_DETALLE.replace("/:id",""),
    AppRoutingPaths.FOROS.replace("/:id",""),
    AppRoutingPaths.CONSEJERIAINFO
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

type PreviewFile = {
  file: File;
  preview?: string;
};

export async function convertRemoteToPreviewFile(remote: {nombre_original: string; ruta_archivo: string; tipo_mime: string;}): Promise<PreviewFile> {
  
  const response = await fetch(remote.ruta_archivo);
  const blob = await response.blob();

  const file = new File([blob], remote.nombre_original, { type: remote.tipo_mime });

  return {
    file,
    preview: remote.tipo_mime.startsWith('image/') ? remote.ruta_archivo : undefined,
  };
}


const meses: { [key: string]: string } = {
  Enero: '0',
  Febrero: '1',
  Marzo: '2',
  Abril: '3',
  Mayo: '4',
  Junio: '5',
  Julio: '6',
  Agosto: '7',
  Septiembre: '8',
  Octubre: '9',
  Noviembre: '10',
  Diciembre: '11',
};

export const parseFechaPersonalizada = (fechaStr: string): Date => {
  const regex = /(\d{2})\/(\w+)\/(\d{4}) (\d{2}):(\d{2}):(\d{2})(AM|PM)/;
  const match = fechaStr.match(regex);

  if (!match) return new Date(0); // fallback

  const [_, dia, mesTexto, anio, horaRaw, minuto, segundo, meridiano] = match;
  let hora = parseInt(horaRaw, 10);
  if (meridiano === "PM" && hora !== 12) hora += 12;
  if (meridiano === "AM" && hora === 12) hora = 0;

  return new Date(
    parseInt(anio, 10),
    parseInt(meses[mesTexto], 10),
    parseInt(dia, 10),
    hora,
    parseInt(minuto, 10),
    parseInt(segundo, 10)
  );
};


export const tiempoTranscurrido = (fechaISO: string): string => {
        const fecha = new Date(fechaISO);
        const ahora = new Date();
        const diff = Math.floor((ahora.getTime() - fecha.getTime()) / 1000);
        const min = Math.floor(diff / 60), h = Math.floor(min / 60), d = Math.floor(h / 24);
        const sem = Math.floor(d / 7), mes = Math.floor(d / 30), year = Math.floor(d / 365);

        if (diff < 60) return 'Hace un momento';
        if (min < 60) return `Hace ${min} min`;
        if (h < 24) return `Hace ${h} h`;
        if (d < 7) return `Hace ${d} día${d === 1 ? '' : 's'}`;
        if (sem < 5) return `Hace ${sem} sem`;
        if (mes < 12) return `Hace ${mes} mes${mes === 1 ? '' : 'es'}`;
        return `Hace ${year} año${year === 1 ? '' : 's'}`;
};

export const FormatearFecha = (fecha: string) => format(new Date(fecha), 'dd/MM/yyyy HH:mm a');

export const getSubdomainKey = () => {
  const host = window.location.hostname;

  if (host === "localhost") {
    return "_local";
  }
  
  const parts = host.split(".");
  const subdomain = parts.length > 2 ? parts[0] : "root";

  return `_${subdomain}`;
};
