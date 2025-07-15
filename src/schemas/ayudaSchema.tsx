import { z } from "zod";

const isValidPhone = (val: string) => val.replace(/\D/g, "").length === 10;
const messageTelefono = "Deben ser 10 dígitos";

export const ayudaSchema = (asuntos: number[]) => 
    z.object({
        nombre: z.string().nonempty("Nombre Completo es requerido"),
        correo: z.string().nonempty("Email es requerido").email("Debe ser un email válido"),
        telefono: z.string().nonempty("Teléfono es requerido").refine(isValidPhone, {
            message: messageTelefono,
        }),
        id_tema_ayuda: z
            .number()
            .min(1, { message: "Asunto es requerido" })
            .refine((id) => asuntos.includes(id), {
                message: "Asunto es requerido",
            }),
        mensaje: z.string().nonempty("Mensaje es requerido"),
});

export type AyudaFormData = z.infer<ReturnType<typeof ayudaSchema>>;