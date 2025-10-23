import React, { useEffect } from "react";
import { Dialog, DialogContent, Box, Typography, Button } from "@mui/material";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import theme from "../../../../themes/theme";

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

    const handleConfirm = () => {
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
                    width: "350px",
                    borderRadius: "16px",
                    padding: "20px",
                },
            }}
        >
            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "20px",
                        flexDirection: "column",
                        textAlign: "center",
                    }}
                >
                    {config.icon}
                    <Typography component="h5" variant="h6" sx={{ color: config.color }}>
                        {mensaje}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            color="primary"
                            fullWidth
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            variant="contained"
                            sx={{ backgroundColor: config.color }}
                            fullWidth
                        >
                            Aceptar
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
