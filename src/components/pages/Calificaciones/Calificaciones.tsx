import React from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';
import { AppRoutingPaths, DescripcionesPantallas, TitleScreen } from '@constants';
import { Calificaciones as CalificacionesIcon, Loading } from "@iconsCustomizeds";
import { Typography } from '../../atoms/Typography/Typography';
import Button from '../../atoms/Button/Button';
import { GlosarioTerminosDialog } from '../../molecules/Dialogs/GlosarioTerminosDialog/GlosarioTerminosDialog';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import PeriodosTabs from '../../molecules/PeriodosTabs/PeriodosTabs';
import TabPanel from '../../molecules/TabPanel/TabPanel';
import { flexRows } from '@styles';
import DsSvgIcon from '../../atoms/Icon/Icon';
import { useNavigate } from 'react-router-dom';
import { toRoman } from '../../../utils/Helpers';

const Calificaciones: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [isOpen, setIsOpen] = React.useState(false);
    const [tabValue, setTabValue] = React.useState(0);

    const handleGlosario = () => (setIsOpen(true));

    const Leyenda = (
        <Typography component="span" variant="body1">
            Aquí encontrarás la calificación final de cada curso, una vez que has realizado los exámenes correspondientes. El porcentaje de avance señala el total de bloques que se han evaluado al momento de tu consulta.
        </Typography>
    );

    const BotonVerGlosario = (variant: 'outlined' | 'contained' = 'contained') => (
        <Button onClick={handleGlosario} fullWidth variant={variant}>Click para ver el Glosario</Button>
    );

    const handleDetalle = () => (
        navigate(AppRoutingPaths.CALIFICACIONES_DETALLE.replace(":id","1"))
    );

    const MateriaCard = () => {
        return(
            Array.from({length: 5}).map((_, key) => (
                <Box 
                    key={key} 
                    sx={[
                        { 
                            display:'flex', 
                            flexDirection: 'column', 
                            gap: '8px', 
                            paddingBottom: '30px', 
                            borderBottom: '1px solid #E0E0E0',
                            paddingTop: '20px', 
                        },
                        key === 0 && { paddingTop: '0px' },
                    ]}
                >
                    <Typography component="span" variant="body1">Práctica y Colaboración Ciudadana I</Typography>
                    <Box sx={{...flexRows, justifyContent: 'space-between'}}>
                        <Typography component="span" variant="body1">Cursando</Typography>
                        <DsSvgIcon component={Loading} color="warning" />
                    </Box>
                    <Typography component={"span"} variant={isMobile ? "body1" : "body3"} color='success'>Calificación 9</Typography>
                    <Box sx={{ display:'flex', gap: '15px' }}>
                        <><Button onClick={handleDetalle} fullWidth>Detalles Calificación</Button></>
                        <><Button onClick={() => {}} fullWidth>Ir al Curso</Button></>
                    </Box>
                </Box>
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

    // const TabsSection = (periodos: number[]) => (
    //     <PeriodosTabs periodos={periodos.length} tabChange={(newValue) => setTabValue(newValue)} />
    // );

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
                        <PeriodosTabs periodos={9} tabChange={(newValue) => setTabValue(newValue)} />
                        
                        {
                            Array.from({length: 9}).map((_, index) => (
                                <TabPanel value={tabValue} index={index} key={index}>
                                    {MateriaCard()}
                                </TabPanel>
                            ))
                        }
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
                    <Grid container>
                        <Grid size={{md: 12}} sx={{ width: '100%'}}>
                            <>
                                <PeriodosTabs periodos={9} tabChange={(newValue) => setTabValue(newValue)} />
                                {
                                    Array.from({length: 9}).map((_, i) => (
                                        <TabPanel value={tabValue} index={i} key={i}>
                                            <Box sx={{ p:4, display: 'flex', justifyContent: 'center' }}>
                                                <Box sx={{ width: '90%' }}>
                                                <TituloIcon Titulo={`Periodo ${toRoman(i + 1)} - Tus materias`} fontSize="h3" />
                                                {
                                                    MateriaCard()
                                                    // data && data.filter((item) => item.id === i).map((item, kix) => (
                                                    //     <Box key={kix} sx={{ marginTop: '16px', display: 'flex', flexDirection: 'column'}}>
                                                    //         {item.materias.map((materia: Materia, idx: number) => (
                                                    //             <Box key={idx}>
                                                    //                 {materiaItem(materia.id_curso, materia.titulo, materia.status as 'Finalizada' | 'Cursando' | 'Inscribirme', true)}
                                                    //             </Box>
                                                    //         ))}
                                                    //     </Box>
                                                    // ))
                                                }
                                                </Box>                                                
                                            </Box>                                                
                                        </TabPanel>
                                    ))
                                }
                            </>
                        </Grid>
                    </Grid>
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                        <PeriodosTabs periodos={9} tabChange={(newValue) => setTabValue(newValue)} />
                        {
                            Array.from({length: 9}).map((_, index) => (
                                <TabPanel value={tabValue} index={index} key={index}>
                                    {MateriaCard()}
                                </TabPanel>
                            ))
                        }
                    </Box> */}
                </ContainerDesktop>
            }            
            <GlosarioTerminosDialog isOpen={isOpen} close={() => setIsOpen(false)} />
        </>
    );
};

export default Calificaciones;