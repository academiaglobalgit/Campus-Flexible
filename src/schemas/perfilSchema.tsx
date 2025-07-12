import { z } from "zod";

const isValidPhone = (val: string) => val.replace(/\D/g, "").length === 10;
const messageTelefono = "Deben ser 10 dígitos";



export const perfilSchema = z.object({
    fechaNacimiento: z.string(),
    matricula: z.string(),
    email: z.string().nonempty("El Email es requerido").email("Debe ser un email válido"),
    telefono: z.string().nonempty("El Teléfono es requerido").refine(isValidPhone, {
         message: messageTelefono,
     }),
    telefonoContacto: z.string().nonempty("El Teléfono de Contacto es requerido").refine(isValidPhone, {
         message: messageTelefono,
     }),
    whatsApp: z.string().nonempty("El WhatsApp es requerido").refine(isValidPhone, {
         message: messageTelefono,
     }),
});

export type PerfilFormData = z.infer<typeof perfilSchema>;