import { z } from "zod";

export const foroSchema = (materias: number[], tutores: number[], limite: number[]) =>
    z.object({
        comentarios: z
            .number()
            .min(1, { message: "Selecciona tipo comentario" })
            .refine((id) => materias.includes(id), {
                message: "Selecciona tipo comentario",
            }),
        ordenar: z
            .number()
            .min(1, { message: "Selecciona tipo Orden" })
            .refine((id) => tutores.includes(id), {
                message: "Selecciona tipo Orden",
            }),
        limite: z
            .number()
            .min(1, { message: "Selecciona un limite" })
            .refine((id) => limite.includes(id), {
                message: "Selecciona un limite",
            }),
        
});


export type ForoData = z.infer<ReturnType<typeof foroSchema>>;