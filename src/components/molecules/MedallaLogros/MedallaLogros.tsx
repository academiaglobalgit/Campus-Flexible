import React from "react";
import { Box, Typography, LinearProgress, useMediaQuery, useTheme } from "@mui/material";
import medallaOro from "../../../assets/medalla_oro.png";
import medallaPlata from "../../../assets/medalla_plata.png";
import medallaBronce from "../../../assets/medalla_bronce.png";

interface MedallaProps {
    nivel: string;
    progreso: number | string;
}

export const MedallaLogros: React.FC<MedallaProps> = ({
    nivel,
    progreso,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const puntos = Number(progreso);

    let medallaSrc = medallaBronce;
    let mensaje = "¡Sigue así, estás a pocos pasos de llegar al siguiente nivel!";

    if (puntos > 3000) {
        medallaSrc = medallaOro;
        mensaje = "¡Increíble! Has alcanzado el nivel Avanzado";
    } else if (puntos > 1500) {
        medallaSrc = medallaPlata;
        mensaje = "¡Excelente! Estás en el nivel Intermedio";
    }

    const progresoPorcentaje = Math.min((puntos / 4600) * 100, 100);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: isMobile ? "90%" : 386,
                textAlign: "center",
                gap: 1.5,
            }}
        >
            <Box
                component="img"
                src={medallaSrc}
                alt={`Medalla de ${nivel}`}
                sx={{
                    width: 120,
                    height: "auto",
                    marginBottom: 1,
                }}
            />

            <Typography variant="h5" color="primary" fontWeight={700}>
                Nivel: {nivel}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                {mensaje}
            </Typography>

            <Box sx={{ width: "100%", mt: 2 }}>
                <LinearProgress
                    variant="determinate"
                    value={progresoPorcentaje}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#AAB1B6",
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "#D9A514",
                            borderRadius: 5,
                        },
                    }}
                />
            </Box>
        </Box>
    );
};
