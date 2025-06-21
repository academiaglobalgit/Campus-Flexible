import { z } from "zod";

export const perfilSchema = z.object({
    email: z.string().nonempty("El Email es requerido").email("Debe ser un email válido"),
    telefono: z.string().nonempty("El Teléfono es requerido"),
});

export type PerfilFormData = z.infer<typeof perfilSchema>;