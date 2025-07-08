import React from "react";
import { DescripcionesPantallas, TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import {ServiciosEscolares as IconServiciosEscolares} from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import CardImage from "../../molecules/Card/CardImage";

import serv_escolares from '../../../assets/serv_escolares.png';
import examenes from '../../../assets/examenes.png';
import constancia from '../../../assets/constancia.png';
import credencial from '../../../assets/credencial.png';
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import Button from "../../atoms/Button/Button";
import { flexRows } from "@styles";
import { InformacionServiciosEscolaresDialog } from "../../molecules/Dialogs/InformacionServiciosEscolaresDialog/InformacionServiciosEscolaresDialog";
// import { useNavigate } from "react-router-dom";

const cardData = [
    { image:serv_escolares, titulo: "Inscripción y materias", servicios: "Inscripción Materias y/o mensualidad" },
    { image:examenes, titulo: "Examenes", servicios: "Examen Estraordinario Examen Especial" },
    { image:credencial, titulo: "Credencial", servicios: "Credencial de Estudiante\n(despues de 6 materias acreditadas" },
    { image:constancia, titulo: "Constancia", servicios: "Constancia de estudios" },
];

const ServiciosEscolares: React.FC = () => {
    // const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isOpenInformacionDialog, setIsOpenInformacionDialog] = React.useState(false);
    
    const handleInformacion = () => {
        setIsOpenInformacionDialog(true);
    };

    const handlePagar = () => {
        // navigate('/servicios-escolares/pagar');
        window.open('https://academiaglobal.mx/servicios-escolares/pagar', '_blank');
    };

    const CardSection = () => (
        <Box 
            sx={[
                { paddingTop: '32px' },
                !isMobile && {width: { md: '90vw' }, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '94px'}
            ]}
          >
            {
                cardData && 
                cardData.map((item, index) => (
                    <Box sx={{ mb:4 }} key={index}>
                        <CardImage key={index} image={item.image} >
                            <Box sx={{ display: 'flex', flexDirection:'column', gap: '24px' }}>
                                <Typography component="h2" variant="h2" color="primary">
                                    {item.titulo}
                                </Typography>
                                <Typography 
                                    component="span" 
                                    variant="body1"
                                    sxProps={{ fontWeight:400, fontSize: '18px', lineHeight:'24px', color: (theme) => `${theme.palette.primary.main}E5` }}>
                                    Servicios
                                </Typography>
                                <Typography 
                                    component="span" 
                                    variant="body1"
                                    sxProps={{ fontWeight:400, fontSize: '14px', lineHeight:'18px', color: "#3B3F5C" }}>
                                    { item.servicios }
                                </Typography>
                                <Box sx={{...flexRows, width: '100%', gap: '10px'}}>
                                    <>
                                        <Button onClick={handleInformacion} fullWidth variant="outlined" >Información</Button>
                                    </>
                                    <>
                                        <Button
                                            onClick={handlePagar}
                                            fullWidth
                                        >
                                            Pagar Aquí
                                        </Button>
                                    </>
                                </Box>
                            </Box>
                        </CardImage>
                    </Box>
                ))
            }
            
          </Box>
    );


    return(
        <>
            {
                isMobile
                        ?
                            <>
                                <TituloIcon Titulo={TitleScreen.SERVICIOS_ESCOLORES} Icon={ IconServiciosEscolares } />
                                <Typography component="span" variant="body1">
                                    {DescripcionesPantallas.SERVICIOS_ESCOLARES}
                                </Typography>
                                <CardSection />
                            </>
                        :
                            <ContainerDesktop title={TitleScreen.SERVICIOS_ESCOLORES} description={DescripcionesPantallas.SERVICIOS_ESCOLARES}>
                                <CardSection />
                            </ContainerDesktop>
            }
            <InformacionServiciosEscolaresDialog isOpen={isOpenInformacionDialog} close={() => setIsOpenInformacionDialog(false)} />
        </>
    );
};

export default ServiciosEscolares;