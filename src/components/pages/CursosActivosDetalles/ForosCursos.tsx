import { Box, useMediaQuery, useTheme } from "@mui/material";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import Button from "../../atoms/Button/Button";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { AccordionStatus } from "../../molecules/AccordionStatus/AccordionStatus";
import { Foros } from '../../../assets/icons';
import EastIcon from '@mui/icons-material/East';
import { accordionStyle, flexColumn, innerHTMLStyle } from "@styles";
import { useGetForosManuales } from "../../../services/CursosActivosService";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { AppRoutingPaths, type CursosTabs } from "@constants";
import { setForoSelected } from "../../../hooks/useLocalStorage";
import StatusIcon from "../../molecules/StatusIcon/StatusIcon";

export const ForosCursos: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetForosManuales(Number(id!), "Foros");

    const foroConfig = { titulo: 'Foros', loading: 'Cargando Foros...', botonEntrar: 'Entrar al foro', mostrarBotonEvaluacion: true };

    const handleForo = (item: CursosTabs) => {
        setForoSelected(JSON.stringify(item));
        navigate(AppRoutingPaths.FOROS.replace(":id", `${item.id_recurso}`));
    }

    const EvaluacionButton = () => (
        <Box sx={[
            !isMobile && { width: '300px' },
            isMobile && { pb: 2 }
        ]}>
            <Button onClick={() => window.open(data?.data.manual[0].url_archivo, '_blank')} disabled={data?.data.manual[0].url_archivo?.length === 0} fullWidth>Instrumento de Evaluación</Button>
        </Box>
    )

    const tituloIcon = () => (
        <TituloIcon Titulo={foroConfig.titulo} Icon={Foros} />
    )

    const AccordionSection = () => (
        data?.data.foros.map((item, index) =>
            <Accordion key={index}
                title={item.titulo_elemento}
                customHeader={!isMobile ? <AccordionStatus tittle={item.titulo_elemento} status={item.estatus_respuesta} /> : undefined}
                sxProps={accordionStyle}>
                {
                    isMobile && <TituloIcon key={1} Titulo={foroConfig.titulo} Icon={Foros} />
                }
                <Box
                    sx={{ ...flexColumn, gap: '20px', alignItems: 'flex-start' }}
                >
                    <Box sx={{ ...innerHTMLStyle }} dangerouslySetInnerHTML={{ __html: item.contenido_elemento }} />

                    {
                        isMobile && <Box sx={{ padding: '10px', width: '100%' }}>
                            <StatusIcon estado={item.estatus_respuesta} />
                        </Box>
                    }
                    <Box sx={{ pl: 3, pr: 3, width: '100%' }}>
                        <Button onClick={() => handleForo(item)} variant="outlined" fullWidth iconPosition={'end'} icon={<EastIcon />}>{foroConfig.botonEntrar}</Button>
                    </Box>
                </Box>
            </Accordion>
        )
    )

    return (
        isLoading
            ?
            <LoadingCircular Text={foroConfig.loading} />
            :
            <>
                {
                    !isMobile &&
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2 }}>
                        {tituloIcon()}
                        {foroConfig.mostrarBotonEvaluacion && EvaluacionButton()}
                    </Box>
                }
                {(isMobile && foroConfig.mostrarBotonEvaluacion) && EvaluacionButton()}
                {AccordionSection()}
            </>
    )
}