import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Typography } from "../../../atoms/Typography/Typography";
import type { Glosario } from "../../../../types/Calificaciones.interface";

type GlosarioDialogProps = {
    isOpen?: boolean;
    glosario?: Glosario[];
    close: () => void;
}

export const GlosarioTerminosDialog: React.FC<GlosarioDialogProps> = ({isOpen, glosario, close}) => {
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
                <Divider sx={{
                        '& .MuiDivider-wrapper': {
                        borderRadius: '50px',
                        padding: '5px 10px 5px 10px',
                        },
                    }}
                >
                    <Typography component="span" variant="body2" color="primary">Glosario de Términos</Typography>
                </Divider>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '25px', paddingBottom: '16px'}}>
                    {glosario && glosario.map((item) => (
                        <Typography key={item.id_glosario} component="span" variant="body2" color="primary">
                            {item.termino}: <Typography component="span" variant="body1">{item.descripcion}</Typography>
                        </Typography>
                    ))}
                </Box>
                {closeButton}
                <Box sx={{paddingTop:'10px'}}></Box>
            </Box>
        </Dialog>
    );
}