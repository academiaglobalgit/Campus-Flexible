import { z } from "zod";

export const newPasswordSchema = z.object({
    username: z.string(),
    new_password: z.string().nonempty("Password es requerido"),
    confirm_password: z.string().nonempty("Confirmar Password es requerido"),
});

export type NewPasswordSchemaFormData = z.infer<typeof newPasswordSchema>;