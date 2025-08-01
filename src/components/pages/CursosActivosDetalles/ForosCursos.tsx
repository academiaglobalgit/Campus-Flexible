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
import { toRoman } from "../../../utils/Helpers";
import { AppRoutingPaths, type CursosTabs } from "@constants";
import { setForoSelected } from "../../../hooks/useLocalStorage";
import StatusIcon from "../../molecules/StatusIcon/StatusIcon";

export const ForosCursos: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { id } = useParams<{ id: string }>();
    const { data: { agrupadoPorUnidad: foros, manuales }, isLoading } = useGetForosManuales(Number(id!), "Foros");

    const handleForo = (item: CursosTabs) => {
        setForoSelected(JSON.stringify(item));
        navigate(AppRoutingPaths.FOROS.replace(":id", `${item.id_recurso}`));
    }

    const EvaluacionButton = () => (
        <Box sx={[
            !isMobile && { width: '300px' },
            isMobile && { pb: 2 }
        ]}>
            <Button onClick={() => window.open(manuales[0].url_archivo, '_blank')} fullWidth>Instrumento de Evaluación</Button>
        </Box>
    )

    const tituloIcon = () => (
        <TituloIcon Titulo={'Foros'} Icon={Foros} />
    )

    const AccordionSection = () => (
        Object.entries(foros).map(([unidad, contenidos], index) =>

            <Accordion key={index}
                title={`Unidad ${toRoman(Number(unidad))}`}
                customHeader={!isMobile ? <AccordionStatus tittle={`Unidad ${toRoman(Number(unidad))}`} status={contenidos?.[0]?.estatus_respuesta} /> : undefined}
                sxProps={accordionStyle}>
                {
                    isMobile && <TituloIcon key={1} Titulo={'Foros'} Icon={Foros} />
                }
                {
                    contenidos.filter((item) => item.unidad === Number(unidad)).map((item, i) => (
                        <Box
                            key={i}
                            sx={{ ...flexColumn, gap: '20px', alignItems: 'flex-start' }}
                        >
                            <Box sx={{ ...innerHTMLStyle }} dangerouslySetInnerHTML={{ __html: item.contenido_elemento }} />
                            <Box sx={{ pl: 3, display: isMobile ? 'block' :'none' }}>
                                <StatusIcon estado={item.estatus_respuesta} />
                            </Box>
                            <Box sx={{ pl: 3, pr: 3, width: '100%' }}>
                                <Button onClick={() => handleForo(item)} variant="outlined" fullWidth iconPosition={'end'} icon={<EastIcon />}>Entrar al foro</Button>
                            </Box>
                        </Box>
                    ))
                }
            </Accordion>
        )
    )

    return (
        isLoading
            ?
            <LoadingCircular Text="Cargando Foros..." />
            :
            <>
                {
                    !isMobile &&
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2 }}>
                        {tituloIcon()}
                        {EvaluacionButton()}
                    </Box>
                }
                {isMobile && EvaluacionButton()}
                {AccordionSection()}
            </>
    )
}