import React from "react";
import { Box, Typography, RadioGroup, FormControlLabel, Radio, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface PreguntaProps {
    item: any;
    respuestas: any[];
    handleRadioChange: (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTextChange: (id: number, value: string) => void;
}

const Pregunta: React.FC<PreguntaProps> = ({
    item,
    respuestas,
    handleRadioChange,
    handleTextChange,
}) => {
    const theme = useTheme();

    const valorActual = (() => {
        const itemRespuesta = respuestas.find(r => r.id_pregunta === item.id_pregunta);
        if (!itemRespuesta) return "";
        if ("id_opcion" in itemRespuesta) return itemRespuesta.id_opcion;
        if ("respuesta_texto" in itemRespuesta) return itemRespuesta.respuesta_texto;
        return "";
    })();

    return (
        <React.Fragment key={item.id_pregunta}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: "8px", alignSelf: "stretch" }}>
                <Box
                    sx={{
                        display: "flex",
                        width: "24px",
                        height: "24px",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "30px",
                        border: `1px solid ${theme.palette.primary.main}`,
                        background: theme.palette.primary.main,
                        color: "#fff",
                    }}
                >
                    {item.orden}
                </Box>
                <Typography
                    component="span"
                    variant="body2"
                    dangerouslySetInnerHTML={{ __html: item.titulo_pregunta ?? "" }}
                />
            </Box>

            {item.tipo_pregunta === "escala" && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <RadioGroup
                        name={`pregunta-${item.id_pregunta}`}
                        value={valorActual}
                        onChange={handleRadioChange(item.id_pregunta)}
                    >
                        {item.opciones.map((opcion: any) => (
                            <FormControlLabel
                                key={opcion.id_opcion}
                                value={opcion.id_opcion}
                                control={<Radio />}
                                label={opcion.etiqueta}
                                sx={{ ml: 1, borderRadius: "8px" }}
                            />
                        ))}
                    </RadioGroup>
                </Box>
            )}

            {item.tipo_pregunta === "abierta" && (
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Escribe tu respuesta"
                    onChange={(e) => handleTextChange(item.id_pregunta, e.target.value)}
                    value={valorActual}
                    sx={{ mt: 1 }}
                />
            )}
        </React.Fragment>
    );
};

export default React.memo(Pregunta);
