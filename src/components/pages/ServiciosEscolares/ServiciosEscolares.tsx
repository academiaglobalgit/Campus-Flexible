import { TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import {ServiciosEscolares as IconServiciosEscolares} from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { Box } from "@mui/material";
import CardImage from "../../molecules/Card/CardImage";

import serv_escolares from '../../../assets/serv_escolares.png';
import examenes from '../../../assets/examenes.png';
import constancia from '../../../assets/constancia.png';
import credencial from '../../../assets/credencial.png';

const cardData = [
    { image:serv_escolares, titulo: "Inscripción y materias", servicios: "Inscripción Materias y/o mensualidad" },
    { image:examenes, titulo: "Examenes", servicios: "Examen Estraordinario Examen Especial" },
    { image:credencial, titulo: "Credencial", servicios: "Credencial de Estudiante\n(despues de 6 materias acreditadas" },
    { image:constancia, titulo: "Constancia", servicios: "Constancia de estudios" },
];

const ServiciosEscolares: React.FC = () => {
    return(
        <>
          <TituloIcon Titulo={TitleScreen.SERVICIOS_ESCOLORES} Icon={ IconServiciosEscolares } />
          <Typography component="span" variant="body1">
            Gestiona de forma sencilla tus inscripciones, documentos, pagos y trámites académicos. Todo en un solo lugar, siempre disponible.
          </Typography>
          <Box sx={{ paddingTop: '32px' }}>
            {
                cardData && 
                cardData.map((item, index) => (
                    <Box sx={{ mb:4 }}>
                        <CardImage key={index} image={item.image} >
                            <Box sx={{ display: 'flex', flexDirection:'column', gap: '24px', paddingLeft: '32px' }}>
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
                                <Box sx={{ padding: "8px 22px 8px 22px" }}>
                                    <Typography 
                                        component="span" 
                                        variant="body1"
                                        color="primary"
                                        sxProps={{ fontWeight:400, fontSize: '18px', lineHeight:'24px', color: (theme) => `${theme.palette.primary[300]}CC` }}>
                                        Ver Información
                                    </Typography>
                                </Box>
                            </Box>
                        </CardImage>
                    </Box>
                ))
            }
            
          </Box>
        </>
    );
};

export default ServiciosEscolares;