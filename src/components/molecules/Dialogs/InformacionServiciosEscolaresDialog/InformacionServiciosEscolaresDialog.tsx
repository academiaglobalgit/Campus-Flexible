import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Typography } from "../../../atoms/Typography/Typography";
import { flexRows } from "@styles";


type GlosarioDialogProps = {
    isOpen?: boolean;
    close: () => void;
}

export const InformacionServiciosEscolaresDialog: React.FC<GlosarioDialogProps> = ({isOpen, close}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(isOpen ?? false);
    },[isOpen]);

    const handleClose = () => {
        setOpen(false);
        close();
    };

    const closeButton = (
        <Button 
            fullWidth
            onClick={handleClose}
        >
            CERRAR
        </Button>
    );
    
    return(
        <Dialog isOpen={open} sxProps={{ margin: '5px', ...(isMobile ? { width: '100%' } : {}) }} >
            <Box sx={[
                {display: 'flex', flexDirection: 'column'},
                isMobile ? {padding: '15px'} : {padding: '30px'},
                !isMobile && { width: '700px'}
            ]}>
                <Box sx={{ textAlign: 'center'}}>
                    <Typography component="h3" variant="h3" color="primary">Inscripción y Materias</Typography>
                </Box>
                <Divider sx={{
                        '& .MuiDivider-wrapper': {
                        backgroundColor: '#fff',
                        borderRadius: '50px',
                        padding: '5px 10px 5px 10px',
                        },
                    }}
                >
                    <Typography component="span" variant="body2" color="primary">Información</Typography>
                </Divider>
                <Box sx={{display: 'flex', flexDirection: 'column', paddingBottom: '16px'}}>
                    <Typography component="span" variant="body2" sxProps={{ pb: '20px' }}>
                        Pago que se realiza de forma anual, con base en tu periodo de inscripción.
                    </Typography>
                    <Box sx={{
                            ...flexRows,
                            backgroundColor: "#F1F4F6", 
                            gap: "10px",
                            boxShadow: "0px 2px 4px 0px #6BBBE44D", 
                            border: "1px solid #BABABA0D",
                            height: "57px",
                            borderRadius: "3px",
                    }}>
                        <Typography component="span" variant="body3">Costo</Typography>
                        <Typography component="span" variant="h4" color="primary">$ 250.00</Typography>
                    </Box>
                    <Typography component="span" variant="body2" color="primary" sxProps={{ pt: '15px' }}>
                        Para más información:
                    </Typography>
                    <Typography component="span" variant="body2">
                        <ul>
                            <li>Horarios de atención: Lunes a viernes de 08:00 a 20:00 Horas (Tiempo del centro) y sábados de 10:00 a 14:00 Horas (Tiempo del Centro).</li>
                            <li>Teléfonos: 667 716 3059/ 667 713 6996 <br /> Correo: contacto@academiaglobal.mx</li>
                        </ul>
                    </Typography>
                </Box>
                {closeButton}
                <Box sx={{paddingTop:'10px'}}></Box>
            </Box>
        </Dialog>
    );
}