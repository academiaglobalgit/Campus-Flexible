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

export const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({isOpen, userName}) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        setOpen(isOpen ?? false);
    },[isOpen]);

    return(
        <Dialog isOpen={open} sxProps={{ width: '350px', minHeight: '250px', borderRadius: '8px' }}>
            <DialogContent>
                <Box sx={{...flexColumn, gap: '15px'}}>
                    <Typography variant="body3" component="span" color="primary" sxProps={{textAlign: 'center'}}>
                        Como es tu primer acceso a la plataforma, necesitas establecer una nueva contraseña.
                    </Typography>
                    <NewPassword userName={userName} />
                </Box>
            </DialogContent>
        </Dialog>
    )
}