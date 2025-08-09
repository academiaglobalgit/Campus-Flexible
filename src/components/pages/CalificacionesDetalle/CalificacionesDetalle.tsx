import { Box, useMediaQuery, useTheme } from "@mui/material";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Users } from "@iconsCustomizeds";
import { Accordion } from "../../molecules/Accordion/Accordion";
import CustomizedTable from "../../molecules/CustomizedTable/CustomizedTable";
import { Typography } from "../../atoms/Typography/Typography";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { accordionStyle, flexColumn, flexRows } from "@styles";
import { useGetCalificacionesDetalles } from "../../../services/CalificacionesService";
import { useParams } from "react-router-dom";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";


const CalificacionesDetalle: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { id } = useParams<{ id: string }>();
    const {data, isLoading } = useGetCalificacionesDetalles(Number(id!));

    const Promedio = ({ estado, calificacion }: { estado: string; calificacion: any }): React.ReactNode => (

        <Box sx={{ mr: 8 }}>
            <Typography
                component={"span"}
                variant={"h5"}
                color={'primary'}>Promedio: </Typography>
            <Typography
                component="span"
                variant={isMobile ? "body1" : "h5"}
                color={estado === 'Finalizado' ? 'success' : 'disabled'}
            >
                {estado === 'Finalizado' ? calificacion : 'Pendiente'}
            </Typography>
        </Box>
    );

    const PeriodosAccordion = () => {
        return (
            isLoading 
            ? <LoadingCircular Text="Cargando Calificaciones..." />
            :
            data && data.detalle.map((item, index) => (
                <Accordion
                    key={index}
                    title={item.tipo_recurso}
                    opcion={isMobile ? '' : Promedio({ estado: "", calificacion: item.promedio_tipo })}
                    sxProps={{
                        ...accordionStyle,
                        width: '100%',
                    }}
                    backgroundDetails={{ backgroundColor: "#FFFFFF !important", }}
                >
                    <CustomizedTable recursos={item.recursos} />
                    <Box
                        sx={{
                            ...flexRows, width: '100%',
                            padding: '16px',
                            borderRadius: '10px',
                            backgroundColor: '#F8F8F9',
                            mt: 2, gap: '10px',

                        }}>
                        <Typography component="h4" variant="h4" color='primary' sxProps={{ transform: isMobile ? 'translateX(0px)' : 'translateX(-40px)' }}>Promedio:</Typography>
                        <Typography component="h4" variant="h4" color='primary' sxProps={{ transform: isMobile ? 'translateX(0px)' : 'translateX(-40px)' }}>{item.promedio_tipo}</Typography>
                    </Box>

                </Accordion >
            ))
        );
    };

    return (
        isMobile
            ?
            <>
                <TituloIcon Titulo="Práctica y Colaboración Ciudadana I" Icon={Users} />
                <Typography component="span" variant="body2" sxProps={{ pl: 4 }}>Click para descargar contenido</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', paddingTop: '20px' }}>
                    {PeriodosAccordion()}
                </Box>
                <Box sx={{
                    ...flexColumn,
                    padding: '16px',
                    borderRadius: '10px',
                    backgroundColor: '#F8F8F9',
                }}>
                    <Typography component="span" variant="h3" color="primary">Calificación Final: </Typography>
                    <Typography component="span" variant="h3" color="primary">{data?.promedio}</Typography>

                </Box>
            </>
            :
            <ContainerDesktop
                title="Práctica y Colaboración Ciudadana I"
                description="Aquí podrás consultar la calificación final de la materia seleccionada, junto con el desglose de cada componente: el valor asignado, el recurso evaluado y la calificación obtenida."
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', pt: 7 }}>
                    <Typography component="h3" variant="h3" sxProps={{ pb: 2 }}>Detalle de tu calificación</Typography>
                    {PeriodosAccordion()}
                </Box>
            </ContainerDesktop>
    );
}

export default CalificacionesDetalle;