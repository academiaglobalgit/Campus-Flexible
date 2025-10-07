import React, { useState } from "react";
import { Box, Typography, Button, TextField, RadioGroup, FormControlLabel, Radio, useTheme, LinearProgress } from "@mui/material";

interface EncuestaSeccionesProps {
    data: any;
    onFinish?: () => void;
    handleRadioChange?: (idPregunta: number, idOpcion: number) => void;
    handleTextChange?: (idPregunta: number, value: string) => void;
    respuestas?: Respuesta;
}

type Respuesta =
    | { id_pregunta: number; id_opcion: number }
    | { id_pregunta: number; respuesta_texto: string };

const EncuestaSecciones: React.FC<EncuestaSeccionesProps> = ({
    data,
    onFinish,
    handleRadioChange,
    handleTextChange,
    respuestas = [],
}) => {
    const encuesta = data?.encuesta;
    const secciones = encuesta?.result_secciones ?? [];
    const [currentSection, setCurrentSection] = useState(0);
    const theme = useTheme();
    const totalSecciones = secciones.length;
    const seccionActual = secciones[currentSection];

    const handleNext = () => {

        console.log("🚀 ~ EncuestaSecciones ~ respuestas:", respuestas)
        if (currentSection < totalSecciones - 1) {
            setCurrentSection((prev) => prev + 1);
            document.getElementById("scroll-encuesta")?.scrollTo({ top: 0, behavior: "smooth" });
        } else {

            onFinish?.();

        }
    };

    const handlePrev = () => {
        if (currentSection > 0) setCurrentSection((prev) => prev - 1);
    };

    const Pregunta: React.FC<{
        item: Preguntas;
        index: number;
        respuestas: Respuesta[];
        handleRadioChange: (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleTextChange: (id: number, value: string) => void;
    }> = ({ item, index, respuestas, handleRadioChange, handleTextChange }) => {
        return (
            <React.Fragment key={item.id_pregunta}>
                <Box key={"pregunta" + index} sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px', alignSelf: 'stretch' }}>
                    <Box sx={{
                        display: "flex",
                        width: "24px",
                        height: "24px",
                        padding: "4px 8px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        aspectRatio: "1 / 1",
                        borderRadius: "30px",
                        border: `1px solid var(--Blue-Blue-100, ${theme.palette.primary.main})`,
                        background: theme.palette.primary.main,
                        color: '#fff'
                    }}>
                        {item.orden}
                    </Box>
                    <Typography component="span" variant="body2" color="text" dangerouslySetInnerHTML={{ __html: item.titulo_pregunta ?? '' }}>
                    </Typography>
                </Box>

                {item.tipo_pregunta === "escala" && (
                    <Box
                        key={`preguntas-${item.id_pregunta}`}
                        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                        <RadioGroup
                            name={`pregunta-${item.id_pregunta}`}
                            value={
                                (() => {
                                    const respuesta = respuestas.find(r => r.id_pregunta === item.id_pregunta);
                                    return respuesta && 'id_opcion' in respuesta ? respuesta.id_opcion : "";
                                })()
                            }
                            onChange={handleRadioChange(item.id_pregunta)}
                        >
                            {item.opciones.map((opcion) => {
                                return (
                                    <FormControlLabel
                                        key={opcion.id_opcion}
                                        value={opcion.id_opcion}
                                        control={<Radio />}
                                        label={opcion.etiqueta}
                                        sx={{
                                            marginLeft: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "10px",
                                            gap: "8px",
                                            alignSelf: "stretch",
                                            borderRadius: "8px",

                                        }}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </Box>
                )}

                {
                    item.tipo_pregunta === "abierta" && (
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Escribe tu respuesta"
                            onChange={(e) => handleTextChange(item.id_pregunta, e.target.value)}
                            value={
                                (() => {
                                    const itemRespuesta = respuestas.find(r => r.id_pregunta === item.id_pregunta);
                                    return itemRespuesta && 'respuesta_texto' in itemRespuesta ? itemRespuesta.respuesta_texto : "";
                                })()
                            }
                            sx={{ mt: 1 }}
                        />
                    )
                }
            </React.Fragment >
        );
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

            <Box sx={{width:'100%'}}>
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
                                index={i}
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
                    <Button
                        variant="contained"
                        
                        onClick={handleNext}
                    >
                        {currentSection === totalSecciones - 1 ? "Finalizar" : "Siguiente"}
                    </Button>
                </Box>
            </Box>


        </Box>
    );
};

export default EncuestaSecciones;
