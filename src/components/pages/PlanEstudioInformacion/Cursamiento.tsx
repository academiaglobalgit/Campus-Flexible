import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import { flexColumn } from "@styles";
import type { Cursamiento as ICursamiento } from "@constants";
import { CardDuracion } from "../../molecules/CardDuracion/CardDuracion";

type CursamientoProps = {
    data: ICursamiento;
}

export const Cursamiento: React.FC<CursamientoProps> = ({data}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const duracion = data.ponderaciones;

    const DescripcionSection = () => {
        return(
            <Box 
                sx={[
                    {...flexColumn, alignItems: "flex-start", gap: '10px', pb: "30px"},
                    !isMobile && {pt:'20px'}
                ]}
            >
                <Typography component="h4" variant="h4" color="primary">Materia Práctica:</Typography>
                <Typography component="span" variant="body1">
                    Tu materia tendrá una duración de 4 semanas, por lo que te recomendamos que dediques el mayor tiempo posible en la lectura de tu material de estudio, para que puedas desarrollar las actividades integradoras de cada unidad y te favorezca al momento de presentar tus exámenes.
                </Typography>
                <Typography component="span" variant="body1">
                    La materia se compone de 4 unidades, las cuales están integradas por los siguientes recursos: material de estudio, videos, actividades interactivas (ejercicios dentro del material), actividades integradoras (tareas), foros, exámenes en cada unidad, proyecto de la materia y examen final.
                </Typography>
                <Typography component="span" variant="body1">
                    En la última unidad, encontrarás las instrucciones del proyecto final de la materia, el cual deberás enviar por medio de tu plataforma de estudio para su evaluación.
                </Typography>
            </Box>
        )
    }

    const PonderacionSection = () => {
        return(
            <Box 
                sx={[
                    {...flexColumn, alignItems: "flex-start", gap: '10px'},
                    !isMobile && {pt:'20px', width: '100%', height: '100%'}
                ]}
            >
                <Typography component="h4" variant="h4" color="primary">¿Cómo será evaluada tu materia?</Typography>
                <Typography component="p" variant="body1">
                    Las ponderaciones son las siguientes:
                </Typography>
                <Box sx={{ display: "flex", flexDirection:"column", gap: "15px", pb: "30px", width: "100%" }}>                
                    {
                        duracion.map((item, index) => (
                            <CardDuracion key={index} label={item.tipo} description={`${item.porcentaje.toString()} %`} sxProps={{ justifyContent: "space-between", padding: "13px 50px" }} />
                        ))
                    }
                </Box>
                <Typography component="span" variant="body1">
                    Es necesario que cuentes con un correo electrónico, si aún no lo tienes, te recomendamos que lo generes lo antes posible, ya que lo utilizarás a lo largo de tu carrera profesional.
                </Typography>
            </Box>
        )
    }

    return(
        isMobile
        ?
            <Box sx={{pb:4}}>
                <DescripcionSection />
                <PonderacionSection />
            </Box>
        :
            <Box>
                <Grid container spacing={6}>
                    <Grid size={{ md: 6 }}>
                        <Box>
                            <DescripcionSection />
                        </Box>
                    </Grid>
                    <Grid size={{ md: 6 }} sx={{ display: 'flex', alignItems: 'center'}}>
                        <Box sx={{...flexColumn, width: '100%'}}>
                            <PonderacionSection />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
    );
}