import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Button from "../../atoms/Button/Button";
import { Dialog } from "../../atoms/Dialog/Dialog";
import type { Encuesta } from "../../../types/Encuestas.interface";
import { stylesEvaluaciones } from "@styles";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type EncuestaDialogProps = {
    isOpen?: boolean;
    data?: Encuesta;
    close: () => void;
}

export const EncuestasModal: React.FC<EncuestaDialogProps> = ({ isOpen, data, close }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(isOpen ?? false);
    }, [isOpen]);

    const handleClose = () => {
        setOpen(false);
        close();
    };

    const siguiente = (
        <Button
            fullWidth
            onClick={handleClose}
            iconPosition={'end'}
            icon={<ArrowForwardIcon />}
        >
            Siguiente
        </Button>
    );
    const anterior = (
        <Button
            fullWidth
            variant="outlined"
            iconPosition={'start'}
            icon={<ArrowBackIcon />}
            onClick={handleClose}
        >
            Anterior
        </Button>
    );

    return (
        <Dialog isOpen={open} sxProps={{ margin: '5px', ...(isMobile ? { width: '100%' } : {}) }} >
            <Box sx={[
                { display: 'flex', flexDirection: 'column' },
                isMobile ? { padding: '15px' } : { padding: '30px' },
                !isMobile && { width: '700px' }
            ]}>
                <Divider sx={{
                    '& .MuiDivider-wrapper': {
                        borderRadius: '50px',
                        padding: '5px 10px 5px 10px',
                    },
                }}
                >
                    <Typography component="span" variant="body2" color="primary">{data?.titulo}</Typography>
                </Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px', paddingBottom: '16px', height: '60vh', overflowY: 'scroll', pr: 2, mb: 2 }}>
                    <Typography
                        variant="body2"
                        component="p"
                        dangerouslySetInnerHTML={{ __html: data?.descripcion ?? '' }}
                        sx={{ textAlign: "justify" }}
                    />
                    <Typography
                        variant="body2"
                        component="p"
                        dangerouslySetInnerHTML={{ __html: data?.contenido ?? '' }}
                        sx={{ ...stylesEvaluaciones, border: 'solid 1px #acacacff', borderRadius: '10px', p: 2, backgroundColor: '#f1f1f1ff !important' }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 4 }}>
                    {anterior}
                    {siguiente}
                </Box>
                <Box sx={{ paddingTop: '10px' }}></Box>
            </Box>
        </Dialog >
    );
}