import { z } from "zod";

export const resetPasswordschema = z.object({
    codigo: z.string().nonempty("El código es requerido"),
    username: z.string().nonempty("Usuario es requerido"),
    new_password: z.string().nonempty("Contraseña es requerido"),
    confirm_password: z.string().nonempty("Confirmar Contraseña es requerido"),

});

export type ResetPasswordschemaFormData = z.infer<typeof resetPasswordschema>;

export const usernameSchema = resetPasswordschema.pick({
    username: true,
});


export type UsernameFormData = z.infer<typeof usernameSchema>;

