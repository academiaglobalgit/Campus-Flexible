import { z } from "zod";

const baseFields = {
  aceptoTerminos: z.boolean().refine(val => val === true, {
    message: "Debes aceptar los términos",
  }),
  aceptoAvisos: z.boolean().refine(val => val === true, {
    message: "Debes aceptar el aviso de privacidad",
  }),
};

const lineamientosField = {
  aceptoLineamientos: z.boolean().refine(val => val === true, {
    message: "Debes aceptar los Términos y Condiciones",
  }),
};

export const terminosSchema = z.object({
  ...baseFields,
  ...lineamientosField,
});

export const terminosSchemaDiplomados = z.object({
  ...baseFields,
});

export type TerminosFormData = z.infer<typeof terminosSchema>;
export type TerminosFormDataDiplomados = z.infer<typeof terminosSchemaDiplomados>;
