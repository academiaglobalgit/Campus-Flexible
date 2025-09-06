import { z } from "zod";

export const agendaCitaSchema = (asuntos: number[]) => 
    z.object({
        matricula: z.string(),
        nombre: z.string(),
        telefono: z.string(),
        id_tema: z
            .number()
            .min(1, { message: "Motivo es requerido" })
            .refine((id) => asuntos.includes(id), {
                message: "Motivo es requerido",
            }),
        mensaje: z.string().nonempty("Mensaje es requerido"),
});

export type AgendaCitaFormData = z.infer<ReturnType<typeof agendaCitaSchema>>;