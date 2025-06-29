import { Box, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import React, { useEffect } from "react";
import Button from "../../atoms/Button/Button";
import { Dialog } from "../../atoms/Dialog/Dialog";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type DialogProps = {
    isOpen?: boolean;
    close: () => void;
}

export const InscribirmeDialog: React.FC<DialogProps> = ({isOpen, close}) => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(isOpen ?? false);
    },[isOpen]);

    const handleClose = () => {
        setOpen(false);
        close();
    };
    
    return(
        <Dialog isOpen={open} sxProps={{ margin: '5px', width: '450px', height: '300px'}} >
            <DialogContent>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', flexDirection: 'column'}}>
                    <InfoOutlinedIcon color="success" sx={{width: 96, height: 96}} />
                    <DialogContentText>
                        ¿Desea inscribirse en la materia Etica I?
                    </DialogContentText>
                </Box>
            </DialogContent>
            <DialogActions sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '24px'}}>
                <Button onClick={handleClose} color="success">
                    Continuar
                </Button>
                <Button onClick={handleClose} variant="outlined" color="primary">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
}