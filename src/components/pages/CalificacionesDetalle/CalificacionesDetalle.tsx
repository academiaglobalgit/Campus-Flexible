import { Box, useMediaQuery, useTheme } from "@mui/material";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Users } from "@iconsCustomizeds";
import { Accordion } from "../../molecules/Accordion/Accordion";
import CustomizedTable from "../../molecules/CustomizedTable/CustomizedTable";
import { Typography } from "../../atoms/Typography/Typography";
import { flexColumn } from "@styles";

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
                        <Box 
                            sx={{ 
                                ...flexColumn, width: '100%', padding: '20px', borderRadius: '10px', backgroundColor: '#F8F8F9'
                            }}>
                            <Typography component="h4" variant="h4" color='primary'>Calificación Final:</Typography>
                            <Typography component="h3" variant="h3" color='primary'>8.6</Typography>
                        </Box>
                    </Box>
                </>
            :<></>
                // <ContainerDesktop 
                //     title={TitleScreen.CALIFICACIONES} 
                //     description={DescripcionesPantallas.CALIFICACIONES}
                //     actions={
                //         promedio("8.6")
                //     }
                //     column1Size={9}
                //     column2Size={3}
                //     specialButton={
                //         BotonVerGlosario('outlined')
                //     }
                // >
                //     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                //         {MateriaCard()}
                //     </Box>
                // </ContainerDesktop>
             
    );
}

export default CalificacionesDetalle;