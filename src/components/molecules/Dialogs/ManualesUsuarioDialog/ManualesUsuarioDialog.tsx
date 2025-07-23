import React, { useEffect } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import { Typography } from "../../../atoms/Typography/Typography";
import { ManualInduccion, Videoteca } from "@iconsCustomizeds";
import { Document2, Paperclip } from "../../../../assets/icons";
import { flexRows } from "@styles";
import { useGetManualesUsuario, useGetLineamientossUsuario } from '../../../../services/ManualesService';
import DsSvgIcon from "../../../atoms/Icon/Icon";


type GlosarioDialogProps = {
    isOpen?: boolean;
    close: () => void;
    menutype: string;
}

type ManualUsuario = {
    id_manual: number;
    titulo: string;
    descripcion: string | null;
    url_archivo: string;
};


export const ManualesUsuarioDialog: React.FC<GlosarioDialogProps> = ({ isOpen, close, menutype }) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { data: docs = [] } = useGetManualesUsuario() ?? {};
    const { data: lineamientos = [] } = useGetLineamientossUsuario() ?? {};

    const todosLosManuales: ManualUsuario[] = [...docs, ...lineamientos];

    const obtenerUrlPorIdManual = (id: number): string | null => {
        const manual = todosLosManuales.find((m) => m.id_manual === id);
        return manual?.url_archivo ?? null;
    };

    const abrirManualPorId = (id: number) => {
        const url = obtenerUrlPorIdManual(id);
        if (url) {
            window.open(url, '_blank');
        } else {
            console.warn(`No se encontró un manual con ID ${id}`);
        }
    };

    const manuales = [
        { id: 'manual-plataforma', icon: ManualInduccion, label: 'Manual de Inducción', action: () => abrirManualPorId(15), type: 'manuales' },
        { id: 'video', icon: Videoteca, label: 'Video de Introducción', action: () => abrirManualPorId(16), type: 'manuales' },
        { id: 'formato', icon: Document2, label: 'Manual Formato APA', action: () => abrirManualPorId(17), type: 'manuales' },
        { id: 'manual-actividades', icon: Paperclip, label: 'Manual de Actividades', action: () => abrirManualPorId(18), type: 'manuales' },
        { id: 'lineamiento-normas', icon: ManualInduccion, label: 'Lineamientos y Normas de Control Escolar', action: () => abrirManualPorId(11), type: 'lineamientos' },
        { id: 'aviso-privacidad', icon: ManualInduccion, label: 'Aviso de Privacidad', action: () => abrirManualPorId(12), type: 'lineamientos' },
        { id: 'terminos', icon: ManualInduccion, label: 'Terminos y Condiciones', action: () => abrirManualPorId(13), type: 'lineamientos' },
        { id: 'lineamiento-responsable', icon: ManualInduccion, label: 'Lineamientos Para el uso Responsable de la IA', action: () => abrirManualPorId(14), type: 'lineamientos' },
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
            onClick={handleClose}
            sxProps={{ width: '320px' }}
        >
            CERRAR
        </Button>
    );


    const IconBox = (item: any) => (
        <Grid size={{ md: 6 }}>
            <Box sx={{
                ...flexRows,
                width: '230px',
                height: '139px',
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: '3px',
                cursor: 'pointer',
                backgroundColor: 'white !important',
                boxShadow: '0px 4px 4px 0px #00000040'
            }} onClick={item.action}>

                {/* <IconLabel icon={item.icon} label={item.label} action={item.action} /> */}

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px 10px' }}>
                    <DsSvgIcon component={item.icon} />
                    <Typography component="h4" variant="h4" color={"primary"} >
                        {item.label}
                    </Typography>
                </Box>

            </Box>
        </Grid>
    );

    return (
        <Dialog isOpen={open} sxProps={{ width: '875px' }} >
            <Box sx={[
                { height: '580px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px', alignItems: 'center' },
            ]}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px', textAlign: 'center' }}>
                    <Typography component="h3" variant="h3" color="primary">{menutype === 'manuales' ? 'MANUAL DE INDUCCIÓN' : 'LINEAMIENTOS'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', paddingBottom: '44px' }}>
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
                </Box>

                {closeButton}
            </Box>
        </Dialog>
    );
}