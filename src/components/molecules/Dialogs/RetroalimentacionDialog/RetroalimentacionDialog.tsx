import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Typography } from "../../../atoms/Typography/Typography";
import { innerHTMLStyle } from "@styles";

type RetroDialogProps = {
    isOpen?: boolean;
    retroalimentacion?: string;
    close: () => void;
}

export const RetroalimentacionDialog: React.FC<RetroDialogProps> = ({isOpen, retroalimentacion, close}) => {
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
                    <Typography component="span" variant="body2" color="primary">Retroalimentación</Typography>
                </Divider>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '25px', paddingBottom: '24px'}}>
                    <Box sx={{ ...innerHTMLStyle }} dangerouslySetInnerHTML={{ __html: retroalimentacion ?? '<p></p>' }} />
                </Box>
                {closeButton}
                <Box sx={{paddingTop:'10px'}}></Box>
            </Box>
        </Dialog>
    );
}