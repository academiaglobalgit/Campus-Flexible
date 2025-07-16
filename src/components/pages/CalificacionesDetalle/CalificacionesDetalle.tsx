import { Box, useMediaQuery, useTheme } from "@mui/material";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Users } from "@iconsCustomizeds";
import { Accordion } from "../../molecules/Accordion/Accordion";
import CustomizedTable from "../../molecules/CustomizedTable/CustomizedTable";
import { Typography } from "../../atoms/Typography/Typography";
import { flexColumn, flexRows } from "@styles";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";

const CalificacionesDetalle: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const Accordions = ["Calificaciones", "Actividades", "Foros"];

    const PeriodosAccordion = () => {
        return(
           Accordions.map((item, index) => (
                <Accordion key={index} title={item} sxProps={{ 
                    width: '100%',
                    backgroundColor: "#F8F8F9", 
                    boxShadow: "0px 2px 4px 0px #6BBBE44D", 
                    border: "1px solid #BABABA0D"
                }}>
                        <CustomizedTable />
                        <Box 
                            sx={{ 
                                ...flexRows, width: '100%', padding: '16px', borderRadius: '10px', backgroundColor: '#F8F8F9', mt: 2, gap: '10px'
                            }}>
                            <Typography component="h4" variant="h4" color='primary'>Promedio:</Typography>
                            <Typography component="h4" variant="h4" color='primary'>8.6</Typography>
                        </Box>
                    
                </Accordion>
            ))
        );
    };

    return (
        isMobile 
        ? 
            <>
                <TituloIcon Titulo="Práctica y Colaboración Ciudadana I" Icon={ Users } />
                <Typography component="span" variant="body2" sxProps={{pl:4}}>Click para descargar contenido</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', paddingTop: '20px'}}>
                    {PeriodosAccordion()}
                </Box>
            </>
        :
            <ContainerDesktop 
                title="Práctica y Colaboración Ciudadana I" 
                description="Aquí podrás consultar la calificación final de la materia seleccionada, junto con el desglose de cada componente: el valor asignado, el recurso evaluado y la calificación obtenida."
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', pt: 7 }}>
                    <Typography component="h3" variant="h3" sxProps={{pb: 2}} >Detalle de tu calificación</Typography>
                    {PeriodosAccordion()}
                </Box>
            </ContainerDesktop>
    );
}

export default CalificacionesDetalle;