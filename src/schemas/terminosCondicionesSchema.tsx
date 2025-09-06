import { z } from "zod";

export const terminosSchema = z.object({
 aceptoTerminos: z.boolean().refine(val => val === true, {
    message: "Debes aceptar los términos",
  }),
  aceptoLineamientos: z.boolean().refine(val => val === true, {
    message: "Debes aceptar los lineamientos",
  }),
  aceptoAvisos: z.boolean().refine(val => val === true, {
    message: "Debes aceptar el aviso de privacidad",
  }),
});

export type TerminosFormData = z.infer<typeof terminosSchema>;