import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, LinearProgress, Tooltip } from "@mui/material";
import Button from "../../../atoms/Button/Button";
import Pregunta from "./Preguntas";

interface EncuestaSeccionesProps {
    data: any;
    respuestas: any[];
    handleRadioChange: (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTextChange: (id: number, value: string) => void;
    isDisabled: boolean;
    isLoading: boolean;
    setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    onFinish?: () => void;
}

const EncuestaSecciones: React.FC<EncuestaSeccionesProps> = ({
    data,
    onFinish,
    handleRadioChange,
    handleTextChange,
    respuestas = [],
    isDisabled,
    isLoading,
    setIsDisabled,
}) => {
    const encuesta = data?.encuesta;
    const secciones = encuesta?.result_secciones ?? [];
    const [currentSection, setCurrentSection] = useState(0);
    const theme = useTheme();
    const totalSecciones = secciones.length;
    const seccionActual = secciones[currentSection];

    useEffect(() => {
        if (!encuesta || !respuestas) return;

        const preguntasSeccionActual = encuesta.result_secciones[currentSection].preguntas;
        const idsPreguntasSeccion = preguntasSeccionActual.map((item: { id_pregunta: any; }) => item.id_pregunta);

        const respuestasDeEstaSeccion = respuestas.filter((item: { id_pregunta: any; }) =>
            idsPreguntasSeccion.includes(item.id_pregunta)
        );
        const todasRespondidas = respuestasDeEstaSeccion.length === preguntasSeccionActual.length;

        setIsDisabled(!todasRespondidas);
    }, [currentSection, respuestas, encuesta]);

    const handleNext = () => {
        if (currentSection < totalSecciones - 1) {
            setCurrentSection((prev) => prev + 1);
            document.getElementById("seccion-preguntas")?.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            setIsDisabled(true)
            onFinish?.();
        }
    };

    const handlePrev = () => {
        if (currentSection > 0) setCurrentSection((prev) => prev - 1);
    };


    return (
        <Box id="scroll-encuesta" sx={{ display: "flex", flexDirection: "column", gap: 3, height: '100vh' }}>
            {/* Título general */}
            <Typography component="h4" variant="h5" color="primary" sx={{ textAlign: "center" }}>
                {encuesta?.titulo}
            </Typography>
            {/* Progreso */}
            <Typography align="center" variant="body2" color="primary">
                Sección {currentSection + 1} de {totalSecciones}
            </Typography>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                    variant="determinate"
                    value={((currentSection + 1) / totalSecciones) * 100}
                    sx={{
                        height: 8,
                        borderRadius: 5,
                        [`& .MuiLinearProgress-bar`]: {
                            backgroundColor: theme.palette.primary.main,
                        },
                    }}
                />
            </Box>

            <Box sx={{ width: '100%' }}>
                {/* Sección actual */}
                <Box>
                    <Typography
                        component="h5"
                        variant="h6"
                        color="primary"
                        dangerouslySetInnerHTML={{ __html: seccionActual?.titulo_seccion }}
                        sx={{ mb: 2 }}
                    />

                    <Box
                        id="seccion-preguntas"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            height: "60vh",
                            overflowY: "auto",
                            pr: 2,
                        }}
                    >
                        {seccionActual?.preguntas?.map((pregunta: any, i: number) => (
                            <Pregunta
                                key={`${pregunta.id_pregunta}-${i}`}
                                item={pregunta}
                                respuestas={respuestas}
                                handleRadioChange={handleRadioChange}
                                handleTextChange={handleTextChange}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Navegación */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                    <Button variant="outlined" disabled={currentSection === 0} onClick={handlePrev}>
                        Anterior
                    </Button>

                    <Tooltip
                        title={isDisabled ? "Faltan preguntas por contestar." : ""}
                        disableHoverListener={!isDisabled}
                        disableFocusListener={!isDisabled}
                    >
                        <span>
                            <Button
                                variant="contained"
                                disabled={isDisabled}
                                isLoading={isLoading}
                                onClick={handleNext}
                            >
                                {currentSection === totalSecciones - 1 ? "Finalizar" : "Siguiente"}
                            </Button>
                        </span>
                    </Tooltip>

                </Box>
            </Box>


        </Box>
    );
};

export default React.memo(EncuestaSecciones);
