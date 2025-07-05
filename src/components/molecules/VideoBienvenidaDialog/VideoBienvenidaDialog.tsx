import { Box, Card, CardActionArea, CardMedia, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Button from "../../atoms/Button/Button";
import { Dialog } from "../../atoms/Dialog/Dialog";
import { Typography } from "../../atoms/Typography/Typography";

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
            <Box sx={[
                {display: 'flex', flexDirection: 'column', gap: '20px'},
                isMobile ? {padding: '15px'} : {padding: '30px'},
                !isMobile && { width: '700px', padding: '24px'}
            ]}>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            component="video"
                            src={ urlVideo || "https://www.w3schools.com/html/mov_bbb.mp4" }
                            controls
                            autoPlay
                            muted
                        />
                    </CardActionArea>
                </Card>
                <Box sx={{ display: "flex", alignItems: "center", width: "100%", justifyContent:"center", flexDirection:"column", gap:"20px"}}>
                    <Typography variant="h3" component="h3" color="primary">
                        Bienvenido / a
                    </Typography>
                    <Typography variant="body1" component="span">
                        Una pequeña explicación aparecerá aquí
                    </Typography>
                </Box>
                {closeButton}
            </Box>
        </Dialog>
    );
}