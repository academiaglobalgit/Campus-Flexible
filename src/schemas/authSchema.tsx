import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().nonempty("El usuario es requerido"),
    password: z.string().nonempty("La contraseña es requerida")
});

export type LoginFormData = z.infer<typeof loginSchema>;