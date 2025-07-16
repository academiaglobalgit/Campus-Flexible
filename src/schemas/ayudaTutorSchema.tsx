import { z } from "zod";

export const ayudaTutorSchema = (materias: number[], tutores: number[], asuntos: number[]) =>
    z.object({
        id_curso: z
            .number() 
            .min(1, { message: "Selecciona una materia válida" })
            .refine((id) => materias.includes(id), {
                message: "Selecciona una materia válida",
            }),
        id_profesor: z
            .number()
            .min(1, { message: "Selecciona un tutor válido" })
            .refine((id) => tutores.includes(id), {
                message: "Selecciona un tutor válido",
            }),
        id_tema_ayuda: z
            .number()
            .min(1, { message: "Asunto es requerido" })
            .refine((id) => asuntos.includes(id), {
                message: "Asunto es requerido",
            }),
        mensaje: z.string().nonempty("Mensaje es requerido"),
});


export type AyudaTutorFormData = z.infer<ReturnType<typeof ayudaTutorSchema>>;