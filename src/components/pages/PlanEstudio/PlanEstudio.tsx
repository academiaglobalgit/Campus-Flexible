import { Box, Divider, Grid, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { AppRoutingPaths, DescripcionesPantallas, TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { Home } from "@iconsCustomizeds";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";
import React from "react";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { VideoBienvenidaDialog } from "../../molecules/VideoBienvenidaDialog/VideoBienvenidaDialog";
import { InscribirmeDialog } from "../../molecules/InscribirmeDialog/InscribirmeDialog";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";

const materiaData = [
    {
        id: 0, periodo: "Primer Periodo", materias: [
            { titulo: "Práctica y Colaboración Ciudadana I", status: "Finalizada" },
            { titulo: "Ciencias sociales I", status: "Cursando" },
            { titulo: "Pensamiento Matemático I", status: "Inscribirme" },
            { titulo: "Desarrollo de Software I", status: "Inscribirme" },
        ]
    },
    {
        id: 1, periodo: "Segundo Periodo", materias: [
            { titulo: "Práctica y Colaboración Ciudadana II", status: "Inscribirme" },
            { titulo: "Ciencias sociales II", status: "Inscribirme" },
            { titulo: "Pensamiento Matemático II", status: "Inscribirme" },
            { titulo: "Desarrollo de Software II", status: "Inscribirme" },
        ]
    },
];

const PlanEstudio: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const betweenDevice = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [isOpenVideo, setIsOpenVideo] = React.useState(false);
    const [isOpenInscribirmeDialog, setIsOpenInscribirmeDialog] = React.useState(false);

    const goToInformacion = () => navigate(AppRoutingPaths.PLAN_ESTUDIO_INFORMACION);

    const [value, setValue] = React.useState(0);
    const [periodos, _setPeriodo] = React.useState(Array.from({ length: 5 })); //<-- REVISAR CON EL ENDPOINT
    
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

    const Leyenda = (
        <Typography component="span" variant="body1">
            En esta sección encontrarás todos los cursos, agrupados por períodos, que integran el Programa de Prepa Coppel. En la columna derecha observamos dos botones. En Información tienes a tu disposición la descripción de objetivos, estructura y recursos que integran cada material académico. El segundo botón, te permitirá solicitar la activación de cada curso.
        </Typography>
    );

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

    const ListadoMateriaVistaMobil = (
        <Box>
            {
                materiaData &&
                materiaData.map((item, index) => (
                    <Box key={index} sx={{ marginBottom: '24px' }}>
                        <Divider textAlign="center">
                            <Typography component="span" variant="body2" color="primary">{item.periodo}</Typography>
                        </Divider>
                        <Box sx={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {item.materias.map((materia, idx) => (
                                <Box key={idx}>
                                    {materiaItem(materia.titulo, materia.status as 'Finalizada' | 'Cursando' | 'Inscribirme', false)}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))
            }
        </Box>
    );

    return (
        <>
            {
                isMobile 
                ? 
                <>
                    <TituloIcon Titulo={TitleScreen.PLAN_ESTUDIOS} Icon={ Home } />
                    {Leyenda}
                    {BotonesVideoMapa()}
                    {ListadoMateriaVistaMobil}
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
                        <Grid container>
                            <Grid size={{md: 12}} sx={{ width: '100%'}}>
                                {                                
                                    !betweenDevice ?
                                        <>
                                            <Box sx={{ width: `${(periodos.length * 108.8)}px`}}>
                                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
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
                                                                materiaData && materiaData.filter((item) => item.id === i).map((item, kix) => (
                                                                    <Box key={kix} sx={{ marginTop: '16px', display: 'flex', flexDirection: 'column'}}>
                                                                        {item.materias.map((materia, idx) => (
                                                                            <Box key={idx}>
                                                                                {materiaItem(materia.titulo, materia.status as 'Finalizada' | 'Cursando' | 'Inscribirme', true)}
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
                                    ListadoMateriaVistaMobil
                                }                            
                            </Grid>
                        </Grid>
                    </ContainerDesktop>
                    {/* <Box sx={{ width: { md: '90vw' }, display: 'flex', flexDirection: 'column', gap: '20px'}}> */}
                        {/* <Grid container sx={{ alignItems:'center'}}>
                            <Grid size={{md: !betweenDevice ? 8 : 12}}>
                                <TituloIcon Titulo={TitleScreen.PLAN_ESTUDIOS} fontSize="h2" />
                                {Leyenda}
                            </Grid>
                            <Grid size={{md: !betweenDevice ? 4 : 12}} sx={{ width: betweenDevice ? "100%" : undefined}}>
                                {BotonesVideoMapa(!betweenDevice ? "column" : "row")}
                            </Grid>
                        </Grid> */}
                        
                        {/* <Grid container>
                            <Grid size={{md: 12}} sx={{ width: '100%'}}>
                                {                                
                                    !betweenDevice ?
                                        <>
                                            <Box sx={{ width: `${(periodos.length * 108.8)}px`}}>
                                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
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
                                                                materiaData && materiaData.filter((item) => item.id === i).map((item, kix) => (
                                                                    <Box key={kix} sx={{ marginTop: '16px', display: 'flex', flexDirection: 'column'}}>
                                                                        {item.materias.map((materia, idx) => (
                                                                            <Box key={idx}>
                                                                                {materiaItem(materia.titulo, materia.status as 'Finalizada' | 'Cursando' | 'Inscribirme', true)}
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
                                    ListadoMateriaVistaMobil
                                }                            
                            </Grid>
                        </Grid> */}
                    {/* </Box> */}
                </>
            }
            <VideoBienvenidaDialog isOpen={isOpenVideo} close={() => setIsOpenVideo(false)} />
            <InscribirmeDialog isOpen={isOpenInscribirmeDialog} close={() => setIsOpenInscribirmeDialog(false)} />
        </>
        
    );
};

export default PlanEstudio;