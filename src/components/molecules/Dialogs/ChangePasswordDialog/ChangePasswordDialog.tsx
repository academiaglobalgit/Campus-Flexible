import React from "react";
import { Dialog } from "../../../atoms/Dialog/Dialog"
import { Box, DialogContent } from "@mui/material";
import { NewPassword } from "../../../pages/Login/NewPassword";
import { Typography } from "../../../atoms/Typography/Typography";
import { flexColumn } from "@styles";

type ChangePasswordDialogProps = {
    isOpen?: boolean;
    userName: string;
}

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ isOpen, userName }) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(isOpen ?? false);
    }, [isOpen]);

    return (
        <Dialog isOpen={open} sxProps={{ width: '450px', minHeight: '250px', borderRadius: '8px' }}>
            <DialogContent>
                <Box sx={{ ...flexColumn, gap: '15px' }}>
                    <Typography variant="body3" component="span" color="primary" sxProps={{ textAlign: 'center' }}>
                        Como es tu primer acceso a la plataforma, necesitas establecer una nueva contraseña.
                    </Typography>
                    Tu nueva contraseña debe cumplir con los siguientes puntos de seguridad:
                    <ul>
                        <li>Longitud Mínima: Tu contraseña debe tener al menos 8 caracteres.</li>
                        <li>Complejidad Requerida: Tu contraseña debe incluir al menos:</li>
                        <li>1 número (por ejemplo, 0-9)</li>
                        <li>1 carácter especial (por ejemplo, !, @, #, $, %, ^, &, *)</li>
                        <li>1 letra mayúscula (por ejemplo, A-Z)</li>
                        <li> 1 letra minúscula (por ejemplo, a-z)</li>
                    </ul>
                    <NewPassword userName={userName} />
                </Box>
            </DialogContent>
        </Dialog>
    )
}