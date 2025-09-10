import React, { useEffect } from "react";

import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Typography } from "../../../atoms/Typography/Typography";
import Button from "../../../atoms/Button/Button";
import contactanos from '../../../../assets/contactanos.png';
import contactanos_movil from '../../../../assets/contactanos_movil.png';
import type { Contacto } from "../../../../types/contacto.interface";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { formatWithIMask } from "../../../../utils/Helpers";
import { WhatsAppContacto, CellPhone, EmailContacto } from "@iconsCustomizeds";

type ContactoDialogProps = {
    isOpen?: boolean;
    data: { telefono: Contacto[], email: Contacto[] };
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

    const imageAvatar = (width: string, height: string) => (
        <Box
            component="img"
            src={!isMobile ? contactanos : contactanos_movil}
            alt="Contactanos"
            sx={{ width, height }}
        />
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

    const textTelefonoEmail = (data: Contacto[]) => (
        <Box
            sx={{ display: 'flex', gap: '5px', flexDirection: 'column' }} >
            {
                data && data.map((item, i) => {
                    if(item.descripcion === "WhatsApp") {
                        return (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <WhatsAppContacto />
                                <Typography component="p" variant='body2'>
                                    {formatWithIMask(item.valor_contacto, "phone")} (WhatsApp)
                                </Typography>
                            </Box>
                        )
                    }else{
                        return (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <CellPhone />
                                <Typography component="p" variant='body2'>
                                    {formatWithIMask(item.valor_contacto, "phone")}
                                </Typography>
                            </Box>
                        )
                    }
                }
                    
                )
            }
        </Box>
    );

    const textEmail = (data: Contacto[]) => (
        <Box
            sx={{ display: 'flex', gap: '5px', flexDirection: 'column' }} >
            {
                data && data.map((item, i) => 
                    <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <EmailContacto />
                        <Typography component="p" variant='body2'>
                            {item.valor_contacto}
                        </Typography>
                    </Box>
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

                {data && textEmail(data.email)}
                
                </Box>
            </Box> 
        )
    };   

    return(
        <Dialog isOpen={open} sxProps={{ width: isMobile ? '350px' : '778px'}} >
        {
            isMobile 
            ? 
                <>
                    <DialogContent 
                        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '12px' }}
                    >
                        {imageAvatar('100%', '100%')}
                        {title}
                        {informacion()}
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'center', paddingLeft: '15px', paddingRight: '15px', paddingBottom: '20px' }}>
                        {closeButton}
                    </DialogActions>
                </>
            :
                <DialogContent 
                    sx={{ display: 'flex', gap: '30px', paddingLeft: '30px', paddingTop: '30px', paddingBottom: '30px' }}
                >
                    {imageAvatar('316px', '431px')}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                            sx={{ display: 'flex', flexDirection: 'column', gap: '20px'}}
                        >
                            {title}
                            {informacion("left")}
                            <Box sx={{paddingTop: '20px'}}>
                                {closeButton}
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
        }
      </Dialog>
    );
}

export default ContactoDialog;