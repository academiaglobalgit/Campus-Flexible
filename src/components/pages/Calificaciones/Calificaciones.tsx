import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';
import { DescripcionesPantallas, TitleScreen } from '@constants';
import { Calificaciones as CalificacionesIcon } from "@iconsCustomizeds";
import { Typography } from '../../atoms/Typography/Typography';
import Button from '../../atoms/Button/Button';
import { Accordion } from '../../molecules/Accordion/Accordion';
import { GlosarioTerminosDialog } from '../../molecules/GlosarioTerminosDialog/GlosarioTerminosDialog';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';

const Calificaciones: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [isOpen, setIsOpen] = React.useState(false);

    const handleGlosario = () => (setIsOpen(true));

    const Leyenda = (
        <Typography component="span" variant="body1">
            Aquí encontrarás la calificación final de cada curso, una vez que has realizado los exámenes correspondientes. El porcentaje de avance señala el total de bloques que se han evaluado al momento de tu consulta.
        </Typography>
    );

    const BotonVerGlosario = (variant: 'outlined' | 'contained' = 'contained') => (
        <Button onClick={handleGlosario} fullWidth variant={variant}>Click para ver el Glosario</Button>
    );

    const PeriodosAccordion = () => {
        return(
            Array.from({length: 5}).map((_, index) => (
                <Accordion key={index} title={`Periodo ${index + 1}`} sxProps={{ 
                    width: '100%',
                    backgroundColor: "#F8F8F9", 
                    boxShadow: "0px 2px 4px 0px #6BBBE44D", 
                    border: "1px solid #BABABA0D"
                }}>
                {
                    Array.from({length: 10}).map((_, key) => (
                        <Box key={key} sx={{ display:'flex', flexDirection: 'column', gap: '8px', paddingBottom: '30px' }}>
                            <Typography component="span" variant="body1">Práctica y Colaboración Ciudadana I</Typography>
                            <Typography component={isMobile ? "span" : "h4"} variant={isMobile ? "body1" : "h4"} color='success'>Calificación 9</Typography>
                            <Box sx={{ display:'flex', gap: '15px' }}>
                                <><Button onClick={() => {}} fullWidth>Foros</Button></>
                                <><Button onClick={() => {}} fullWidth>Actividades</Button></>
                            </Box>
                            <Button onClick={() => {}} fullWidth>Detalles de Calificación</Button>
                        </Box>
                    ))
                }
                </Accordion>
            ))
        );
    };

    const promedio = (promedio: string) => (
        <Box sx={[{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'}, isMobile && {flexDirection: 'column'}]}>
        {
            isMobile 
                ?
                <>
                    <Typography component="h4" variant="h4" color='primary'>PROMEDIO GENERAL:</Typography>
                    <Typography component="h3" variant="h3" color='primary'>{promedio}</Typography>
                </>
            :
                <Typography 
                    color='primary'
                    component={!betweenDevice ? "h2" : "h3"}
                    variant={!betweenDevice ? "h2" : "h3"}
                >PROMEDIO GENERAL: {promedio}</Typography>
        }
        </Box>
    );

    return (
        <>
           {
            isMobile 
            ? 
                <>
                    <TituloIcon Titulo={TitleScreen.CALIFICACIONES} Icon={ CalificacionesIcon } />
                    {Leyenda}
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '30px', paddingTop: '20px'}}>
                        {BotonVerGlosario('contained')}
                        {promedio("8.6")}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%'}}>
                            {PeriodosAccordion()}
                        </Box>
                    </Box>
                </>
            :
                <ContainerDesktop 
                    title={TitleScreen.CALIFICACIONES} 
                    description={DescripcionesPantallas.CALIFICACIONES}
                    actions={
                        promedio("8.6")
                    }
                    column1Size={9}
                    column2Size={3}
                    specialButton={
                        BotonVerGlosario('outlined')
                    }
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                        {PeriodosAccordion()}
                    </Box>
                </ContainerDesktop>
            }            
            <GlosarioTerminosDialog isOpen={isOpen} close={() => setIsOpen(false)} />
        </>
    );
};

export default Calificaciones;