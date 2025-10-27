import * as React from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

type LoadingBackdropProps = {
    open: boolean;
    onClose?: () => void;
    message?: string;
    color?: string;
    zIndex?: number;
};

export const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({
    open,
    onClose,
    message = "Guardando...",
    color = "#fff",
    zIndex,
}) => {
    return (
        <Backdrop
            sx={(theme) => ({
                color,
                zIndex: zIndex ?? theme.zIndex.drawer + 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            })}
            open={open}
            onClick={onClose}
        >
            <CircularProgress size={60} color="inherit" />
            <Typography
                variant="h3"
                sx={{ fontWeight: 500, letterSpacing: 0.3, textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
            >
                {message}
            </Typography>
        </Backdrop>
    );
};
