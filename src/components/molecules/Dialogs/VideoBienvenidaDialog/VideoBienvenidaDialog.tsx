import { Box, DialogActions, DialogContent, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { VideoCard } from "../../VideoCard/VideoCard";
import { Typography } from "../../../atoms/Typography/Typography";


type DialogProps = {
    urlVideo: string;
    isOpen?: boolean;
    tipo?: number;
    close: () => void;
}

export const VideoBienvenidaDialog: React.FC<DialogProps> = ({ urlVideo, isOpen, close, tipo }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(isOpen ?? false);
    }, [isOpen]);

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

    const tiposVideos = {
        1: {
            titulo: '¡Video de Inducción!',
            desc: 'Descubre en este video cómo funciona tu campus digital, la herramienta clave para tu éxito académico. <br> Te guiaremos por cada sección: curso calendario y más.<br>  ¡Explora e interactúa! Aprovecha al máximo todas las funcionalidades que tienes a tu disposición.'
        },
        4: {
            titulo: '¡Tu futuro digital empieza aquí!',
            desc: 'Te damos la más cordial bienvenida al Diplomado en IA, Liderazgo y Cultura Digital. <br> Hemos preparado este video para darte un saludo especial e invitarte a explorar todo lo que aprenderás con nosotros.'
        },
    }

    const textVideo = (tittle: string, desc: string) => {
        return (<>
            <Typography component="h3" variant="h3" color="primary" sxProps={{ textAlign: 'center', mt: 2 }} >
                {tittle}
            </Typography>
            <Box dangerouslySetInnerHTML={{ __html: desc }} sx={theme.typography.body2}></Box>
        </>)
    }


    return (
        <Dialog isOpen={open} sxProps={{ margin: '5px', height:'auto'}} >
            <DialogContent>
                {
                (tipo === 4 || tipo === 1) 
                ? 
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
                            <Box>
                                <Box dangerouslySetInnerHTML={{ __html: urlVideo }}></Box>
                            </Box>
                            <Box>
                                {
                                    textVideo(tiposVideos[tipo].titulo, tiposVideos[tipo].desc)
                                }
                            </Box>
                        </Box>
                    </>
                    :
                    <>
                        <VideoCard
                            urlVideo={urlVideo}
                            controls={true}
                            autoPlay={true}
                            muted={false}
                            title="¡Tu futuro digital empieza aquí!"
                            description="Te damos la más cordial bienvenida al Diplomado en IA, Liderazgo y Cultura Digital. Hemos preparado este video para darte un saludo especial e invitarte a explorar todo lo que aprenderás con nosotros."
                        />
                    </>
                }
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center', paddingLeft: '15px', paddingRight: '15px', paddingBottom: '20px' }}>
                {closeButton}
            </DialogActions>
        </Dialog>
    );
}