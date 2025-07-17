import { Box, useMediaQuery, useTheme } from "@mui/material";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import Button from "../../atoms/Button/Button";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Typography } from "../../atoms/Typography/Typography";
import { Foros } from '../../../assets/icons';
import EastIcon from '@mui/icons-material/East';
import { accordionStyle, flexRows } from "@styles";

const forosData = [
            { titulo: "Unidad I", desc: 'Desafío - Elaboración de un informe con Power BI', idForo: "12" },
        ]
export const ForosCursos: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return(
        <Box sx={{pb:4}}>
            <Box sx={{...flexRows, justifyContent: 'space-between', pb: '15px'  }}>
                {
                   !isMobile && <TituloIcon key={1} Titulo={'Foros'} Icon={Foros} />
                }
                <Box sx={{ width: !isMobile ? '300px' : '100%' }}>
                    <Button onClick={() => { }} fullWidth variant="contained" >Instrumento de Evaluación</Button>
                </Box>
            </Box>

            {forosData.map((temas: any, i: number) => (

                <Accordion key={i} title={temas.titulo} sxProps={accordionStyle}>
                    {
                        isMobile && <TituloIcon key={1} Titulo={'Foros'} Icon={Foros} />
                    }
                    
                    <Typography component="p" variant="body2" color='text.primary'>
                        Participa en el foro enviando imágenes que demuestren que ya tienes acceso a las siguientes herramientas en su versión de prueba:
                        <ul>
                            <li>Sistema operativo Linux</li>
                        </ul>
                    </Typography>                    
                    <Button onClick={() => { }} variant="outlined" fullWidth iconPosition={'end'} icon={<EastIcon />}>Entrar al foro</Button>
                </Accordion>
            ))}
        </Box>

    )
}