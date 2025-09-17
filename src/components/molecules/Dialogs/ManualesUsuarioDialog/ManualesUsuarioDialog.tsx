import React, { useEffect } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Typography } from "../../../atoms/Typography/Typography";
import { ManualInduccion, Videoteca } from "@iconsCustomizeds";
import { Document2, Paperclip } from "../../../../assets/icons";
import { flexColumn, flexRows } from "@styles";
import DsSvgIcon from "../../../atoms/Icon/Icon";
import { useDocumentos } from "../../../../context/DocumentosContext";

type GlosarioDialogProps = {
    isOpen?: boolean;
    close: () => void;
    menutype: string;
}

interface MenuItemManual {
  id: string;
  icon: any; // o ReactNode si pasas JSX directamente
  label: string;
  action: () => void;
  type: "manuales" | "lineamientos"; // restringimos a esos dos tipos
  url: string | null;
}


export const ManualesUsuarioDialog: React.FC<GlosarioDialogProps> = ({ isOpen, close, menutype }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { documentos } = useDocumentos();
    const [open, setOpen] = React.useState(false);

    const obtenerUrlPorIdManual = (id: number): string | null => {
        const manual = documentos.find((m) => m.id_tipo_manual === id);
        return manual?.url_archivo ?? null;
    };

    const abrirManualPorId = (id: number) => {
        const url = obtenerUrlPorIdManual(id);
        if (url) {
            window.open(url, '_blank');
        } else {
            return false
        }
    };
    
    const manuales: MenuItemManual[] = [
        { id: 'manual-plataforma', icon: ManualInduccion, label: 'Manual de Inducción', action: () => abrirManualPorId(1), type: 'manuales', url: obtenerUrlPorIdManual(1) },
        { id: 'video', icon: Videoteca, label: 'Video de Introducción', action: () => abrirManualPorId(0), type: 'manuales', url: obtenerUrlPorIdManual(0) },
        { id: 'formato', icon: Document2, label: 'Manual Formato APA', action: () => abrirManualPorId(11), type: 'manuales', url: obtenerUrlPorIdManual(11) },
        { id: 'manual-actividades', icon: Paperclip, label: 'Manual de Actividades', action: () => abrirManualPorId(12), type: 'manuales', url: obtenerUrlPorIdManual(12) },
        { id: 'lineamiento-normas', icon: ManualInduccion, label: 'Lineamientos', action: () => abrirManualPorId(3), type: 'lineamientos', url: obtenerUrlPorIdManual(3) },
        { id: 'aviso-privacidad', icon: ManualInduccion, label: 'Aviso de Privacidad', action: () => abrirManualPorId(16), type: 'lineamientos', url: obtenerUrlPorIdManual(16) },
        { id: 'terminos', icon: ManualInduccion, label: 'Terminos y Condiciones', action: () => abrirManualPorId(17), type: 'lineamientos', url: obtenerUrlPorIdManual(17) },
        { id: 'lineamiento-responsable', icon: ManualInduccion, label: 'Lineamientos Para el uso Responsable de la IA', action: () => abrirManualPorId(14), type: 'lineamientos', url: obtenerUrlPorIdManual(14) },
    ];

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


    const IconBox = (item: MenuItemManual) => (
        <Grid size={{ md: 6, xs: 12 }}>
            <Box sx={ 
                [
                    isMobile && {...flexRows, width: '230px'},
                    !isMobile && {...flexColumn},
                    {
                        height: '139px',
                        borderRadius: '3px',
                        ...(item.url === null ? {
                            cursor: 'not-allowed',
                            backgroundColor: '#ffffff95',
                            border: `1px solid rgb(0, 0, 0, .12)`,
                        } : {
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            boxShadow: '0px 4px 4px 0px #00000040',
                            border: `1px solid ${theme.palette.primary.main}`,
                        })
                    }
                ]} 
                onClick={item.action}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px 10px' }}>
                    <DsSvgIcon component={item.icon} sxProps={{ color: item.url === null ? "rgba(0, 0, 0, 0.3)" : "primary" }} />
                    <Typography component="h4" variant="h4" color={"primary"} sxProps={{ color: item.url === null ? 'rgba(0, 0, 0, 0.3)' : '' }}>
                        {item.label}
                    </Typography>
                </Box>

            </Box>
        </Grid>
    );

    return (
        <Dialog isOpen={open} sxProps={{ width: !isMobile ?  '875px' : '350px' }} >
            <Box sx={[
                !isMobile && { height: '580px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px', alignItems: 'center' },
                isMobile && { padding: '24px' }
            ]}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px', textAlign: 'center' }}>
                    <Typography 
                        component={!isMobile ? "h3" : "h4"} 
                        variant={!isMobile ? "h3" : "h4"} 
                        color="primary"
                    >{menutype === 'manuales' ? 'MANUAL DE INDUCCIÓN' : 'LINEAMIENTOS'}</Typography>
                </Box>
                <Box sx={
                    [
                        { display: 'flex', flexDirection: 'column' },
                        !isMobile && { gap: '30px', paddingBottom: '44px'},
                        isMobile && { alignItems: 'center', gap: '15px', paddingBottom: '24px'}
                    ]
                }>
                {
                    !isMobile
                    ?
                        <>
                            <Grid container spacing={4} >
                                {
                                    manuales.filter((item) => item.type === menutype).slice(0, 2).map((item) => (
                                        <IconBox key={item.id} {...item} />
                                    ))
                                }
                            </Grid>
                            <Grid container spacing={4}>
                                {
                                    manuales.filter((item) => item.type === menutype).slice(-2).map((item) => (
                                        <IconBox key={item.id} {...item} />
                                    ))
                                }
                            </Grid>
                        </>
                    :
                    <>
                        {
                            manuales.filter((item) => item.type === menutype).map((item) => (
                                <IconBox key={item.id} {...item} />
                            ))
                        }
                    </>
                }
                </Box>
                
                <Box sx={{width: !isMobile ? '320px' : '100%'}}>
                    {closeButton}
                </Box>
            </Box>
        </Dialog>
    );
}