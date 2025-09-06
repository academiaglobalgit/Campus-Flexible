import { z } from "zod";

const isValidPhone = (val: string) => val.replace(/\D/g, "").length === 10;
const messageTelefono = "Deben ser 10 dígitos";

export const ayudaSchema = (asuntos: number[], isLogin: boolean) => 
    z.object({
        nombre: isLogin ? z.string().nonempty("Nombre Completo es requerido") : z.string(),
        correo: isLogin ? z.string().nonempty("Email es requerido").email("Debe ser un email válido") : z.string(),
        telefono: isLogin ? z.string().nonempty("Teléfono es requerido").refine(isValidPhone, {
            message: messageTelefono,
        }) : z.string(),
        id_tema_ayuda: z
            .number()
            .min(1, { message: "Asunto es requerido" })
            .refine((id) => asuntos.includes(id), {
                message: "Asunto es requerido",
            }),
        mensaje: z.string().nonempty("Mensaje es requerido"),
});

export type AyudaFormData = z.infer<ReturnType<typeof ayudaSchema>>;