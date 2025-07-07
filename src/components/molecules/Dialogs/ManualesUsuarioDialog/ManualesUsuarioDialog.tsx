import React, { useEffect } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Typography } from "../../../atoms/Typography/Typography";
import { ManualInduccion, Videoteca } from "@iconsCustomizeds";
import { Document2, Paperclip } from "../../../../assets/icons";
import { IconLabel } from "../../IconLabel/IconLabel";
import { flexRows } from "@styles";


type GlosarioDialogProps = {
    isOpen?: boolean;
    close: () => void;
}

export const ManualesUsuarioDialog: React.FC<GlosarioDialogProps> = ({isOpen, close}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const manuales = [
        { id: 'manual-plataforma', icon: ManualInduccion, label: 'Manual de Inducción', action: () => {}},
        { id: 'video', icon: Videoteca, label: 'Preguntas frecuentes', action: () => {} },
        { id: 'formato', icon: Document2, label: 'Contacto', action: () => {} },
        { id: 'manual-actividades', icon: Paperclip, label: 'Ayuda', action: () => {} },
    ];

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


    const IconBox = (item: any) => (
        <Grid size={{ md: 6 }}>
            <Box sx={{ 
                ...flexRows, 
                width: '119px', 
                height: '114px', 
                border: `1px solid ${theme.palette.primary.main}`, 
                borderRadius: '3px', 
                cursor: 'pointer',
                boxShadow: '0px 4px 4px 0px #00000040'
            }} onClick={item.action}>
                <IconLabel icon={item.icon} label={item.label} action={item.action} />
            </Box> 
        </Grid>
    );
    
    return(
        <Dialog isOpen={open} sxProps={{ width: '310px' }} >
            <Box sx={[
                { height: '580px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px' },
            ]}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px', textAlign: 'center' }}>
                    <Typography component="h3" variant="h3" color="primary">MANUALES DE USUARIO</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '44px'}}>
                    <Grid container spacing={2} >
                        {
                            manuales.slice(0,2).map((item) => (
                                <IconBox key={item.id} {...item} />
                            ))
                        }
                    </Grid>
                    <Grid container spacing={2}>
                        {
                            manuales.slice(-2).map((item) => (
                                <IconBox key={item.id} {...item} />
                            ))
                        }
                    </Grid>
                </Box>
                
                {closeButton}   
            </Box>
        </Dialog>
    );
}