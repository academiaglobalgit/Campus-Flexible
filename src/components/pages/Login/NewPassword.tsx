import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { newPasswordSchema, type NewPasswordSchemaFormData } from "../../../schemas/newpasswordSchema";
import Button from "../../atoms/Button/Button";
import { useNotification } from "../../../providers/NotificationProvider";
import { useAuth } from "../../../hooks";
import { AppRoutingPaths } from "@constants";
import { useNavigate } from "react-router-dom";

type NewPasswordProps = {
    userName: string;
}

export const NewPassword: React.FC<NewPasswordProps> = ({userName}) => {
    const {showNotification} = useNotification();
    const { newPassword } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);
    
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<NewPasswordSchemaFormData>({
            resolver: zodResolver(newPasswordSchema),
            defaultValues: {
                username: userName
            },            
    });

    const onSubmit = async (data: NewPasswordSchemaFormData) => {
    const password = data.new_password;

    if (password.length < 6) {
        showNotification("La contraseña debe tener al menos 6 caracteres", "warning");
        return;
    }
    if (!/[A-Z]/.test(password)) {
        showNotification("La contraseña debe contener al menos una letra mayúscula", "warning");
        return;
    }

    if (!/[a-z]/.test(password)) {
        showNotification("La contraseña debe contener al menos una letra minúscula", "warning");
        return;
    }

    if (!/\d/.test(password)) {
        showNotification("La contraseña debe contener al menos un número", "warning");
        return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        showNotification("La contraseña debe contener al menos un carácter especial", "warning");
        return;
    }

    if (data.new_password !== data.confirm_password) {
        showNotification("La nueva contraseña y la confirmación deben ser iguales", "warning");
        return;
    }

    setLoading(true);
    const result = await newPassword(userName, data.new_password);
    console.log("🚀 ~ onSubmit ~ data.new_password:", data.new_password)
    console.log("🚀 ~ onSubmit ~ userName:", userName)

    if (result.success) {
        navigate(AppRoutingPaths.TERMINOS_CONDICIONES);
    } else {
        showNotification(result.message ?? "Ocurrió un error inesperado", "warning");
        setLoading(false);
    }
};


    return(
        <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <Controller
                name="new_password"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="new-password"
                        label="Ejemplo: UnaClaveSegura456!"
                        fullWidth
                        error={!!errors.new_password}
                        helperText={errors.new_password?.message}
                        autoComplete="new-password"
                        type="password"
                    />
                )}
            />
            <Controller
                name="confirm_password"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="confirm-password"
                        label="Confirmar Contraseña"
                        fullWidth
                        error={!!errors.confirm_password}
                        helperText={errors.confirm_password?.message}   
                        autoComplete="new-password"
                        type="password"                      
                    />
                )}
            />
            <Button
                fullWidth
                onClick={handleSubmit(onSubmit)}
                isLoading={loading}
                disabled={!isValid}
            >
                Cambiar Contraseña
            </Button>
        </Box>
    )
}