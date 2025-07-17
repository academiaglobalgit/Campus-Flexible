import { accordionStyle } from "@styles"
import { Accordion } from "../../molecules/Accordion/Accordion"
import { Typography } from "../../atoms/Typography/Typography"
import { Box, useTheme } from "@mui/material"

const data = [
    { titulo: "Evaluación 1", contenido: 'Desafío - Elaboración de un informe con Power BI' },
];

export const Evaluaciones: React.FC = () => {
    const theme = useTheme();
    
    return(
        data.map((temas: any, i: number) => (
            <Accordion key={i} title={temas.titulo} sxProps={accordionStyle}>
                <Typography component="h5" variant="h5" sxProps={{ color: theme.palette.primary.dark, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                    Titulo
                </Typography>
                <Box sx={{ color: theme.palette.primary.dark, justifyContent: "center", alignItems: "center", textAlign: "center", padding: '31px' }}>
                    Aquí se debe mostrar el
                    contenido de la unidad
                </Box>
            </Accordion>
        ))
    )
}