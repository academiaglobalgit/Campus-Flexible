import { Box, Grid, Link, useMediaQuery, useTheme } from "@mui/material";
import { accordionStyle, flexColumn } from "@styles"
import { Tutorias as TutoriasIcon } from '../../../assets/icons';
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";
import { useParams } from "react-router-dom";
import { useGetTutorias } from "../../../services/CursosActivosService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import type { Tutoria } from "@constants";

export const Tutorias: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const {id} = useParams<{id:string}>();    
    const { data: tutorias, isLoading } = useGetTutorias(Number(id!), "Tutorias");

    const text = (texto: string, color: 'primary' | any = 'primary') => (
        isMobile
        ?
            <Typography component="span" variant="body3" color={color}>
                {texto}
            </Typography>
        :
            <Typography component="h4" variant="h4" color={color}>
                {texto}
            </Typography>
    )

    const AgregarButton = (url: string) => (
        <Button onClick={() => window.open(url)} fullWidth >Agregar a mi calendario</Button>
    )

    const AccederButtons = (acceder: string, grabacion: string) => (
        <>
            <Button onClick={() => window.open(acceder)} fullWidth>Acceder Aquí</Button>
            <Button onClick={() => window.open(grabacion)} variant="outlined" fullWidth sxProps={{ color: theme.palette.grey[200] }} >Grabación</Button>
        </>
    )

    const recursosCompartidos = (recursos: any[]) => (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            {
                recursos.map((item, i) => (
                    <Link key={i} href={item.url} target="_blank">{item.titulo}</Link>
                ))
            }
        </Box>
    )

    return(
        isLoading
        ?
            <LoadingCircular Text="Cargando Clases..." />
        :
            <>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', gap: '18px' }}>
                    <TituloIcon key={1} Titulo={'Clases'} Icon={TutoriasIcon} />
                </Box>

                {
                    tutorias && tutorias.data.map((tutoria: Tutoria, i: number) => (
                        <Accordion key={i} title={tutoria.titulo} sxProps={accordionStyle}>
                            {
                                isMobile
                                ?
                                    <Box sx={{...flexColumn, alignItems: 'flex-start', gap: '20px' }}>
                                        {text(tutoria.titulo)}
                                        <Box sx={{...flexColumn, alignItems: 'flex-start', gap: '0px' }}>
                                            {text(tutoria.fecha_inicio)}
                                            {text("(Hora Centro)", theme.palette.text)}
                                        </Box>
                                        {AgregarButton(tutoria.calendario_url)}
                                        {text("Descripción")}
                                        <Typography component="p" variant="body2">
                                            { tutoria.descripcion }
                                        </Typography>
                                        {text("Recursos Compartidos")}
                                        {recursosCompartidos(tutoria.recursos)}
                                        {AccederButtons(tutoria.reunion_url, tutoria.grabacion_url)}
                                    </Box>
                                :
                                    <Grid container spacing={2}>
                                        <Grid size={{md:8}}>
                                            <Box sx={{...flexColumn, alignItems: 'flex-start', gap: '20px' }}>
                                                {text(tutoria.titulo)}
                                                <Box sx={{...flexColumn, alignItems: 'flex-start', gap: '0px' }}>
                                                    {text(tutoria.fecha_inicio)}
                                                    {text("(Hora Centro)", theme.palette.text)}
                                                </Box>
                                                {text("Descripción")}
                                                <Typography component="p" variant="body2">
                                                    { tutoria.descripcion }
                                                </Typography>
                                                {text("Recursos Compartidos")}
                                                {recursosCompartidos(tutoria.recursos)}
                                            </Box>
                                        </Grid>
                                        <Grid size={{md:4}}>
                                            <Box sx={{...flexColumn, gap: '40px'}}>
                                                {AgregarButton(tutoria.calendario_url)}
                                                <Box sx={{...flexColumn, width: '100%', gap: '10px'}}>
                                                    {AccederButtons(tutoria.reunion_url, tutoria.grabacion_url)}
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                            }
                        </Accordion>
                    ))
                }
            </>            
    )  
}