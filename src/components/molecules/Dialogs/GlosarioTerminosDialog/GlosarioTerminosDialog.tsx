import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Typography } from "../../../atoms/Typography/Typography";

type GlosarioDialogProps = {
    isOpen?: boolean;
    close: () => void;
}

export const GlosarioTerminosDialog: React.FC<GlosarioDialogProps> = ({isOpen, close}) => {
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
                    <Typography component="span" variant="body2" color="primary">
                        Periodo: <Typography component="span" variant="body1">Es la forma en la que vienen agrupadas las materias por bloques de 4, 5 o más materias.</Typography>
                    </Typography>
                    <Typography component="span" variant="body2" color="primary">
                        Examen de módulo: <Typography component="span" variant="body1">Evaluación online que presentarás en tu plataforma cuando concluyas un módulo de tu curso, está compuesto por 10 a 20 preguntas.</Typography>
                    </Typography>
                    <Typography component="span" variant="body2" color="primary">
                        Calificación Parcial: <Typography component="span" variant="body1">Es el promedio que obtendrás de todos los exámenes de módulo que hayas presentado durante cada asignatura, el cual equivale al 40% de tu Calificación Final, el cual verás reflejado en un máximo de 4 puntos.</Typography>
                    </Typography>
                    <Typography component="span" variant="body2" color="primary">
                        Examen Final: <Typography component="span" variant="body1">Es una evaluación online que deberás presentar cuando concluyas los contenidos de todo curso o materia. Está compuesto por 20 o 25 preguntas y equivale al 60% de tu Calificación Final y la verás representada con un máximo de 6 puntos.</Typography>
                    </Typography>
                </Box>
                {closeButton}
                <Box sx={{paddingTop:'10px'}}></Box>
            </Box>
        </Dialog>
    );
}