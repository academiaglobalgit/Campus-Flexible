import { Box, useMediaQuery, useTheme } from "@mui/material";
import { accordionStyle } from "@styles"
import { Tutorias as TutoriasIcon } from '../../../assets/icons';
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Typography } from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";

const tutoriasData = [
    { titulo: "Tutoria I", fecha: 'Junio 25, 2025 - 16:00 -hrs', status: "Sin iniciar", desc: "", recuros: "Titulo del recurso", link: "link aqui", grabacion: "lin aqui x2", recursoTitulo: 'tutoria 1' },
];

export const Tutorias: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return(

        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5, alignItems: 'start', justifyContent: 'center', gap: '18px' }}>
                <TituloIcon key={1} Titulo={'Tutorias'} Icon={TutoriasIcon} />
            </Box>

            {tutoriasData.map((tutoria: any, i: number) => (
                <Accordion key={i} title={tutoria.titulo} sxProps={accordionStyle}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', color: theme.palette.primary.dark, justifyContent: "start", alignItems: "start", textAlign: "start", gap: '10px' }}>

                        <Box sx={isMobile ? {} : { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

                            <Box sx={isMobile ? {} : { display: 'flex', flexDirection: 'column', width: '50%' }}>
                                <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily }}>
                                    {tutoria.titulo}
                                </Typography>
                                <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily }}>
                                    {tutoria.fecha}
                                </Typography>
                                <Typography component="p" variant="body2" color='text.primary'>
                                    {tutoria.status}
                                </Typography>
                            </Box>

                            <Box sx={isMobile ? {} : { display: 'flex', flexDirection: 'row', width: '40%' }}>
                                <Button onClick={() => { }} variant="contained" fullWidth >Agregar a mi calendario</Button>
                            </Box>

                        </Box>

                        <Box sx={isMobile ? {} : { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'start' }}>

                            <Box sx={isMobile ? {} : { display: 'flex', flexDirection: 'column', width: '50%' }}>
                                <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily }}>
                                    Descripción
                                </Typography>

                                <Typography component="p" variant="body2" color='text.primary'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </Typography>

                                <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily }}>
                                    Recursos Compartidos
                                </Typography>
                                <Typography component="p" variant="body2" sxProps={{ color: theme.palette.info.main }}>
                                    {tutoria.recursoTitulo}
                                </Typography>
                            </Box>

                            <Box sx={isMobile ? { display: 'flex', flexDirection: 'column', gap: '10px' } : { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '40%', gap: '20px' }}>
                                <Button onClick={() => { }} variant="contained" fullWidth >Acceder Aquí</Button>
                                <Button onClick={() => { }} variant="outlined" fullWidth sxProps={{ color: theme.palette.grey[200] }} >Grabación</Button>
                            </Box>

                        </Box>

                    </Box>
                </Accordion>
            ))}
        </>
    )  
}