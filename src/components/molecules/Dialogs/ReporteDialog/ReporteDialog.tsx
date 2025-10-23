import React, { useEffect } from "react";
import { Dialog, DialogContent, Box, Typography, DialogTitle, DialogActions, Grid, Card, CardContent, Table, TableBody, TableRow, TableCell, TableHead, TextField, Chip } from "@mui/material";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import theme from "../../../../themes/theme";
import DownloadIcon from '@mui/icons-material/Download';
import Button from "../../../atoms/Button/Button";

type DialogType = "success" | "warning" | "danger" | "info";

type DialogProps = {
    isOpen?: boolean;
    mensaje?: string;
    tipo?: DialogType;
    data?: any;
    close: (isConfirmar: boolean) => void;
};

export const ReporteDialog: React.FC<DialogProps> = ({
    isOpen,
    close,
    mensaje,
    data,
    tipo = "warning",
}) => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setOpen(isOpen ?? false);
    }, [isOpen]);

    const handleClose = () => {
        setOpen(false);
        close(false);
    };

    const handleDescargarReporte = () => {
        setOpen(false);
        close(true);
    };

    const config = {
        success: {
            icon: <CheckCircleOutlineIcon sx={{ fontSize: 96, color: "#4caf50" }} />,
            color: theme.palette.primary.dark,
        },
        warning: {
            icon: <WarningAmberOutlinedIcon sx={{ fontSize: 96, color: "#D9A514" }} />,
            color: theme.palette.primary.dark,
        },
        danger: {
            icon: <ErrorOutlineIcon sx={{ fontSize: 96, color: "#f44336" }} />,
            color: theme.palette.primary.dark,
        },
        info: {
            icon: <InfoOutlinedIcon sx={{ fontSize: 96, color: "#2196f3" }} />,
            color: theme.palette.primary.dark,
        },
    }[tipo];

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                "& .MuiDialog-paper": {
                    margin: "5px",
                    width: "100%",
                    borderRadius: "16px",
                    padding: "20px",
                },
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Prueba Inicial de Competencias Digitales y Adaptativas – Certificación I
            </DialogTitle>
            <DialogContent dividers>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "20px",
                        flexDirection: "column",
                        textAlign: "center",
                        Width: "100%",
                    }}
                >

                    <Typography component="span" variant="body1" sx={{ color: config.color, textAlign: 'justify' }}>
                        Este reporte ofrece una visión completa de tus competencias digitales, adaptativas y de liderazgo. Integra tres dimensiones: Autopercepción (cómo te ves), Desempeño conductual (cómo actúas) y Confianza personal (cómo te sientes frente al cambio). Los resultados no son una calificación, sino una guía para tu desarrollo profesional y personal dentro de la Certificación I.
                    </Typography>

                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="primary"
                    fullWidth
                >
                    Cancelar
                </Button>
                <Button
                    onClick={handleDescargarReporte}
                    variant="contained"
                    sxProps={{ backgroundColor: config.color }}
                    fullWidth
                    icon={<DownloadIcon />}
                    iconPosition="end"
                >
                    Descargar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
