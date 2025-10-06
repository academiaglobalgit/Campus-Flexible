import { Box, useMediaQuery, useTheme } from "@mui/material";
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
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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

    return (
        <Dialog isOpen={open} sxProps={{ margin: '5px' }} >
            <Box
                sx={[
                    { display: 'flex', flexDirection: 'column', gap: '20px' },
                    isMobile ? { padding: '15px' } : { padding: '30px' },
                    !isMobile && { width: '700px', padding: '24px', height: '600px' }
                ]}
            >

                {tipo === 4 ? <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>

                        <Box>
                            <Box dangerouslySetInnerHTML={{ __html: urlVideo }}>
                            </Box>
                        </Box>
                        <Box>
                            <Typography component="h3" variant="h3" color="primary" sxProps={{ textAlign: 'center', mt: 2 }} >
                                ¡Tu futuro digital empieza aquí!
                            </Typography>
                            <Typography component="span" variant="body2" color="text" sxProps={{ textAlign: 'center' }} >
                                Te damos la más cordial bienvenida al Diplomado en IA, Liderazgo y Cultura Digital. Hemos preparado este video para darte un saludo especial e invitarte a explorar todo lo que aprenderás con nosotros.
                            </Typography>
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
                {closeButton}
            </Box>
        </Dialog>
    );
}