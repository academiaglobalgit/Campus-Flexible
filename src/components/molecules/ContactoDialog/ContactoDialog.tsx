
import { Avatar } from "../../atoms/Avatar/Avatar";
import { Dialog } from "../../atoms/Dialog/Dialog";
import { Box, DialogActions, DialogContent, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import contactanos from '../../../assets/contactanos.png';
import React, { useEffect } from "react";

type ContactoDialogProps = {
    isOpen?: boolean;
    data: { telefono: string[], email: string[] };
    close: () => void;
}

const ContactoDialog: React.FC<ContactoDialogProps> = ({isOpen, data, close}) => {
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

    const imageAvatar = (size:number) => (
        <Avatar src={contactanos} width={size} height={size} />
    );

    const title = (
        <Typography 
            color='primary'
            component="h3"
            variant='h3'
        >
            CONTACTO
        </Typography>
    );

    const textTelefonoEmail = (data: string[]) => (
        <Box
            sx={{ display: 'flex', gap: '5px', flexDirection: 'column' }} >
            {
                data && data.map((item, i) => 
                    <Typography component="p" variant='body2' key={i}>
                        {item}
                    </Typography>
                )
            }
        </Box>
    );

    const informacion = (textAlign: string = 'center') => {
        const style = textAlign === "center" ? { justifyContent: 'center', alignItems: 'center' } : {};

        return (
            <Box sx={{...style, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Box sx={{ textAlign }}>
                <Typography component="h4" variant='h4'>
                    Teléfonos
                </Typography>

                {data && textTelefonoEmail(data.telefono)}
                    
                </Box>
                <Box sx={{ textAlign }}>
                <Typography component="h4" variant='h4'>
                    Correo Electrónico
                </Typography>

                {data && textTelefonoEmail(data.email)}
                
                </Box>
            </Box> 
        )
    };   

    return(
        <Dialog isOpen={open} width={isMobile ? '350px' : '900px'} >
        {
            isMobile 
            ? 
                <>
                    <DialogContent 
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', paddingTop: '20px', paddingBottom: '12px' }}
                    >
                        {imageAvatar(150)}
                        {title}
                        {informacion()}
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'center', paddingLeft: '15px', paddingRight: '15px', paddingBottom: '20px' }}>
                        {closeButton}
                    </DialogActions>
                </>
            :
                <DialogContent 
                    sx={{ display: 'flex', gap: '50px', padding: '50px', justifyContent: 'center' }}
                >
                    {imageAvatar(334)}
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column', gap: '20px'}}
                    >
                        {title}
                        {informacion("left")}
                        <Box sx={{paddingTop: '20px'}}>
                            {closeButton}
                        </Box>
                    </Box>
                </DialogContent>
        }
      </Dialog>
    );
}

export default ContactoDialog;