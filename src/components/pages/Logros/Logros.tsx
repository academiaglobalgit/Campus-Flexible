import { TipoManualesIds, TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Calendario as IconCalendario } from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { useGetDatosModulos } from "../../../services/ModulosCampusService";
import { ModulosCampusIds } from "../../../types/modulosCampusIds";
import { innerHTMLStyle } from "@styles";
import { useDocumentos } from "../../../context/DocumentosContext";
import { LinearProgressWithLabel } from '../../molecules/LinearProgress/LinearProgress';


const Logros: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { documentos } = useDocumentos();
    const { data: CalendarioDatos, isLoading } = useGetDatosModulos(ModulosCampusIds.CALENDARIO);

    console.log(documentos.find(doc => doc.id_tipo_manual === TipoManualesIds.CALENDARIO)?.url_archivo);

    const LogrosCards: React.FC<{ horas: string, tipo: string }> = ({ horas, tipo }) => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', width: '188px', height: '92px', backgroundColor: '#E6F4FF', borderRadius: '8px', marginBottom: '32px', marginTop: '36px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    <Typography component="h4" variant="h4" color="primary"> {horas} </Typography>
                    <Typography component="h4" variant="h4" color="primary">   </Typography>
                </Box>
                <Typography component="h4" variant="h4" color="primary"> {tipo} </Typography>
            </Box>
        );
    }

    const Medalla: React.FC<{ nivel: string, progreso: string }> = ({ nivel, progreso }) => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <Typography component="h2" variant="h2" color="primary"> {nivel} </Typography>
                <Typography component="span" variant="body1" color="primary" sxProps={{ textAlign: 'center' }}>
                    Nivel: ¡Sigue asi, estas a pocos pasos de llegar al siguiente nivel!
                </Typography>
                <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel
                        value={Number(progreso)}
                        barColor={'#D9A514'}
                        trackColor="#AAB1B6"
                    />
                </Box>
            </Box>
        );
    }

    const PDFSection = (

        isLoading
            ?
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', height: '50vh', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
                <Typography component="h4" variant="h4" color="primary">
                    Cargando logros...
                </Typography>
            </Box>
            :
            <Box sx={{ paddingTop: '32px', paddingBottom: '32px', height: '100vh', overflow: 'hidden' }}>

                <Typography component="h4" variant="h4" color="primary"> Mi progreso en plataforma </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginTop: '16px' }}>

                    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: isMobile ? '10px' : '0px', marginTop: '16px', width: isMobile ? '100%' : '60%' }}>
                        <LogrosCards horas="125" tipo="En plataforma" />
                        <LogrosCards horas="5" tipo="Certificaciones" />
                        <LogrosCards horas="5" tipo="Concluidos" />
                    </Box>

                    <Box>
                        <Medalla nivel="Nivel: Avanzado" progreso="80" />
                    </Box>
                </Box>

            </Box>
    );

    return (
        isMobile
            ?
            <>
                <TituloIcon Titulo={TitleScreen.LOGROS} Icon={IconCalendario} />
                <Box sx={{ ...innerHTMLStyle, pl: 0, pr: 0 }} dangerouslySetInnerHTML={{ __html: CalendarioDatos?.data?.descripcion_html ?? '' }} />
                {PDFSection}

                <Box sx={{
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px',
                    width: '100%'
                }}>

                </Box>
            </>
            :
            <ContainerDesktop title={TitleScreen.LOGROS} description={CalendarioDatos?.data?.descripcion_html ?? ''}>
                {PDFSection}
            </ContainerDesktop>
    );
};

export default Logros;