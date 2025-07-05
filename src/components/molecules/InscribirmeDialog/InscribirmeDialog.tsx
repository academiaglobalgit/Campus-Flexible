import React, { useEffect } from "react";
import { Box, DialogContent } from "@mui/material";
import Button from "../../atoms/Button/Button";
import { Dialog } from "../../atoms/Dialog/Dialog";
import { Avatar } from "../../atoms/Avatar/Avatar";
import check_circle from "../../../assets/check_circle.png";
import { Typography } from "../../atoms/Typography/Typography";

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
        <Dialog isOpen={open} sxProps={{ margin: '5px', width: '350px', height: '342px'}} >
            <DialogContent>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', flexDirection: 'column'}}>
                    <Avatar src={check_circle} width={150} height={150} />
                    <Typography component="h3" variant="h3" color="primary">¿Deseas Inscribirte?</Typography>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%'}}>
                        <>
                            <Button onClick={handleClose} fullWidth>
                                Confirmar y Pagar
                            </Button>
                        </>
                        <>
                            <Button onClick={handleClose} fullWidth variant="outlined" color="primary">
                                Cancelar
                            </Button>
                        </>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}