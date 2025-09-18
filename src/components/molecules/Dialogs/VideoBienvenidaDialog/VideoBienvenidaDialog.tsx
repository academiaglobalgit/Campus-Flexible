import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { VideoCard } from "../../VideoCard/VideoCard";

type DialogProps = {
    urlVideo: string;
    isOpen?: boolean;
    close: () => void;
}

export const VideoBienvenidaDialog: React.FC<DialogProps> = ({urlVideo, isOpen, close}) => {
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
        <Dialog isOpen={open} sxProps={{ margin: '5px'}} >
            <Box 
                sx={[
                    {display: 'flex', flexDirection: 'column', gap: '20px'},
                    isMobile ? {padding: '15px'} : {padding: '30px'},
                    !isMobile && { width: '700px', padding: '24px'}
                ]}    
            >
                <VideoCard 
                    urlVideo={urlVideo} 
                    controls={true} 
                    autoPlay={true} 
                    muted={false} 
                    //title="Bienvenido / a" 
                    title="¡Tu futuro digital empieza aquí!" 
                    description="Te damos la más cordial bienvenida al Diplomado en IA, Liderazgo y Cultura Digital. Hemos preparado este video para darte un saludo especial e invitarte a explorar todo lo que aprenderás con nosotros."
                />
                {closeButton}
            </Box>
        </Dialog>
    );
}