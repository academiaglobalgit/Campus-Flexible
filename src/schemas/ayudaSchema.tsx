import { z } from "zod";

export const ayudaSchema = z.object({
    name: z.string().nonempty("Nombre Completo es requerido"),
    email: z.string().nonempty("Email es requerido").email("Debe ser un email válido"),
    phone: z.string().nonempty("Teléfono es requerido"),
    message: z.string().nonempty("Mensaje es requerido"),
});

export type AyudaFormData = z.infer<typeof ayudaSchema>;