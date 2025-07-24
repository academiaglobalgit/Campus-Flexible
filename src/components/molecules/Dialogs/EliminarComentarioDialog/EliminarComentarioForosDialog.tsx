import React, { useEffect } from "react";
import { Box, DialogContent } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Typography } from "../../../atoms/Typography/Typography";

type DialogProps = {
    isOpen?: boolean;
    close: (value: boolean) => void;
}

export const EliminarComentarioDialog: React.FC<DialogProps> = ({ isOpen, close }) => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(isOpen ?? false);
    }, [isOpen]);

    const handleClose = (val: boolean) => {
        setOpen(false);
        close(val);
    };

    return (
        <Dialog isOpen={open} sxProps={{ margin: '5px', width: '350px' }} >
            <DialogContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexDirection: 'column' }}>
                    <Typography component="h4" variant="h4" color="primary">Eliminar comentario</Typography>
                    <Typography component="span" variant="body3">¿Deseas eliminar este comentario?</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%' }}>
                        <>
                            <Button onClick={() => handleClose(true)} fullWidth color="error">
                                Sí, Borrar
                            </Button>
                        </>
                        <>
                            <Button onClick={() => handleClose(false)} fullWidth variant="outlined" color="primary">
                                No borrar
                            </Button>
                        </>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}