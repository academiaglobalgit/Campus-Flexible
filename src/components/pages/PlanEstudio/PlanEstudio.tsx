import React from "react";
import { Box, Divider, Grid, Skeleton, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { AppRoutingPaths, DescripcionesPantallas, TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { Home } from "@iconsCustomizeds";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { VideoBienvenidaDialog } from "../../molecules/VideoBienvenidaDialog/VideoBienvenidaDialog";
import { InscribirmeDialog } from "../../molecules/InscribirmeDialog/InscribirmeDialog";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { useGetPlanEstudio } from "../../../services/PlanEstudioService";
import { numerosOrdinales } from "../../../utils/Helpers";

const PlanEstudio: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const {data: materiaData, isLoading } = useGetPlanEstudio(1);
    
    const [isOpenVideo, setIsOpenVideo] = React.useState(false);
    const [isOpenInscribirmeDialog, setIsOpenInscribirmeDialog] = React.useState(false);

    const goToInformacion = () => navigate(AppRoutingPaths.PLAN_ESTUDIO_INFORMACION);

    const [value, setValue] = React.useState(0);
    
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleVideoBienvenida = () => {
        setIsOpenVideo(true);
    }

    const handleAction = (status: string) => {
        if(status === "Inscribirme") {
            setIsOpenInscribirmeDialog(true);
        }
    }

    const getPeriodoText = (periodo: number): string => {
        return `${ numerosOrdinales(periodo) } Periodo`;
    };

    const InformacionStatusButtons = (status: string, color: "success" | "primary" | "info" | "warning" | undefined) => (
        <Box sx={{ paddingTop: '8px', display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
            <>
                <Button onClick={goToInformacion} fullWidth variant="outlined">Información</Button>
            </>
            <>
                <Button 
                    fullWidth
                    onClick={() => handleAction(status)} 
                    color={color}
                >{status}</Button>
            </>
        </Box>
    );

    const materiaItem = (materia: string, status: 'Finalizada' | 'Cursando' | 'Inscribirme', isDesktop = true) => {        
        let color: "success" | "primary" | "info" | "warning" | undefined;
        if(status === 'Finalizada') {
            color = "success";
        }else if(status === "Cursando"){
            color = "warning";        
        } else {
            color = undefined;
        }

        return (
            isDesktop ? 
                <Box sx={{ borderBottom: '2px solid #AAB1B6'}}>
                    <Grid container sx={{ display: 'flex', alignItems: 'center', height: '80px'}}>
                        <Grid size={{md: 6}}>
                            <Typography component="span" variant="body1" sxProps={{ fontSize: '18px', lineHeight: '24px' }} >
                                {materia}
                            </Typography>
                        </Grid>
                        <Grid size={{md: 6}}>
                            {InformacionStatusButtons(status, color)}
                        </Grid>
                    </Grid>
                </Box>
            :
            <Box>
                <Typography component="span" variant="body1" sxProps={{ fontSize: '18px', lineHeight: '24px' }} >
                    {materia}
                </Typography>
                {InformacionStatusButtons(status, color)}
            </Box>
        )
    };

    const BotonesVideoMapa = (flexDirection: string = "row") => (
        <Box sx={{ paddingTop: '32px', paddingBottom: '8px', display: 'flex', flexDirection, gap: '15px', justifyContent: 'space-between' }}>
            <>
                <Button
                    onClick={handleVideoBienvenida}
                    fullWidth
                    icon={!isMobile ? <OndemandVideoIcon /> : undefined}
                    iconPosition={!isMobile ? "start" : undefined}
                >
                    Video de Bienvenida
                </Button>
            </>
            <>
                <Button onClick={() => {}} fullWidth variant="outlined" >Mapa Curricular</Button>
            </>
        </Box>
    );

    const ListadoMateriaVistaMobil = (data: any[]) => (
        <Box>
            {
                data &&
                data.map((item, index) => (
                    <Box key={index} sx={{ marginBottom: '24px' }}>
                        <Divider textAlign="center">
                            <Typography component="span" variant="body2" color="primary">{getPeriodoText(item.periodo)}</Typography>
                        </Divider>
                        <Box sx={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {item.materias.map((materia: any, idx: number) => (
                                <Box key={idx}>
                                    {materiaItem(materia.titulo, materia.status, false)}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))
            }
        </Box>
    );

    const ListadoMateriasVistaDesktop = (data: any[], periodos: any[]) => (
        <Grid container>
            <Grid size={{md: 12}} sx={{ width: '100%'}}>
                {                                
                    !betweenDevice ?
                        <>
                            <Box 
                                sx={[
                                    periodos.length === 5 && { width: `${(periodos.length * 108.8)}px`}
                                ]} 
                            >
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    {
                                        periodos.map((_, i) => <Tab label={`Periodo ${i + 1}`} value={i} key={i} />)
                                    }
                                </Tabs>
                            </Box>
                            {
                                periodos.map((_, i) => (
                                    <TabPanel value={value} index={i} key={i}>
                                        <Box sx={{ p:4}}>
                                            <TituloIcon Titulo={`Periodo ${i + 1} - Tus materias`} fontSize="h3" />
                                            {
                                                data && data.filter((item) => item.id === i).map((item, kix) => (
                                                    <Box key={kix} sx={{ marginTop: '16px', display: 'flex', flexDirection: 'column'}}>
                                                        {item.materias.map((materia: any, idx: number) => (
                                                            <Box key={idx}>
                                                                {materiaItem(materia.titulo, materia.status, true)}
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                ))
                                            }
                                        </Box>                                                
                                    </TabPanel>
                                ))
                            }
                        </>
                    :
                    ListadoMateriaVistaMobil(data)
                }                            
            </Grid>
        </Grid>
    );

    const SkeletonDesktop = () => (
        <>
            <Box sx={{ display: 'flex', gap: '20px', mt:'6px'}}>
                {
                    Array.from({length: 5}).map((_, index) => <Skeleton key={index} variant="rounded" width={108} height={40} />)
                }
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', pt: '28px', pl:'32px'}}>
                <Skeleton variant="rounded" width={300} height={30} />
                {
                    Array.from({length: 3}).map((_, index) => (
                        <Box key={index} sx={{ borderBottom: '2px solid #AAB1B6'}}>
                            <Grid container sx={{ display: 'flex', alignItems: 'center', height: '80px'}}>
                                <Grid size={{md: 6}}>
                                    <Skeleton variant="rounded" width={400} height={30} />
                                </Grid>
                                <Grid size={{md: 6}}>
                                    <Box sx={{ display: 'flex', gap: '15px'}}>
                                        <Skeleton variant="rounded" width={258} height={40} />
                                        <Skeleton variant="rounded" width={258} height={40} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    )
                    )
                }
            </Box>
        </>
    );

    const Listado = () => {
        const data = materiaData || [];
        
        if(isLoading) {
            if(isMobile) {
                return ("");
            }else{
                return SkeletonDesktop();
            }
        }else{
            if(data.length > 0) {
                if(isMobile) {
                    return ListadoMateriaVistaMobil(data);
                }else{
                    return ListadoMateriasVistaDesktop(data, data.filter((item) => item.periodo));
                }
            }
        }
    };

    return (
        <>
            {
                isMobile 
                ? 
                <>
                    <TituloIcon Titulo={TitleScreen.PLAN_ESTUDIOS} Icon={ Home } />
                    <Typography component="span" variant="body1">
                        {DescripcionesPantallas.PLAN_ESTUDIO}
                    </Typography>
                    {BotonesVideoMapa()}
                    {Listado()}
                </>
                :
                <>
                    <ContainerDesktop 
                        title={TitleScreen.PLAN_ESTUDIOS} 
                        description={DescripcionesPantallas.PLAN_ESTUDIO}
                        actions={
                            BotonesVideoMapa(!betweenDevice ? "column" : "row")
                        }
                    >
                        {
                            Listado()
                        }
                    </ContainerDesktop>
                </>
            }
            <VideoBienvenidaDialog isOpen={isOpenVideo} close={() => setIsOpenVideo(false)} />
            <InscribirmeDialog isOpen={isOpenInscribirmeDialog} close={() => setIsOpenInscribirmeDialog(false)} />
        </>
        
    );
};

export default PlanEstudio;