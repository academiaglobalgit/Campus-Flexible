import { z } from "zod";

export const ayudaTutorSchema = (materias: number[], tutores: number[]) =>
    z.object({
        materia: z
            .number()
            .min(1, { message: "Selecciona una materia válida" })
            .refine((id) => materias.includes(id), {
                message: "Selecciona una materia válida",
            }),
        tutor: z
            .number()
            .min(1, { message: "Selecciona un tutor válido" })
            .refine((id) => tutores.includes(id), {
                message: "Selecciona un tutor válido",
            }),
        email: z.string().nonempty("Correo del alumno es requerido").email("Debe ser un email válido"),
        message: z.string().nonempty("Mensaje es requerido"),
});


export type AyudaTutorFormData = z.infer<ReturnType<typeof ayudaTutorSchema>>;