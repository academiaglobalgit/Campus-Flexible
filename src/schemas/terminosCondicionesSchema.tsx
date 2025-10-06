import { z } from "zod";


const lineamientosField = {
  aceptoLineamientos: z.boolean().refine(val => val === true, {
    message: "Debes aceptar los Términos y Condiciones",
  }),
};

export const terminosSchema = z.object({
  ...lineamientosField,
});

export type TerminosFormData = z.infer<typeof terminosSchema>;

