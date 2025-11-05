import React from "react";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useGetCalificaciones } from "../../../services/CalificacionesService";
import { formatFechaBonita } from "../../../utils/Helpers";
import Button from "../../atoms/Button/Button";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";


export const Certificaciones: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { data: calificacionData, isLoading: isLoadingCertis } = useGetCalificaciones();

    const handleDescargar = (download: string) => {
        if (!download) return;
        const link = document.createElement("a");
        link.href = download;
        link.setAttribute("download", "");
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const Certificaciones = (id: number, title: string, fecha: string, download: string) => (
        <React.Fragment key={id}>
            <Box key={id + 'seccion'} sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 2 }}>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        fecha === null ? <Typography component="span" variant={isMobile ? 'body2' : 'h4'} color={'disabled'} >
                            Sin iniciar
                        </Typography> :
                            <Typography component="span" variant="body3" color="text"> {formatFechaBonita(fecha)} </Typography>
                    }
                    <Typography component="h5" variant="h5" color="primary"> Certificación en {title} </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: isMobile ? 'flex-start' : 'flex-end', width: '350px' }}>
                    <Button disabled={download === null || download === '' ? true : false} onClick={() => handleDescargar(download)} sxProps={{ width: '140px' }}>
                        Ver detalles
                    </Button>
                </Box>
            </Box>

            <Divider />
        </React.Fragment>
    );
    return (
        <>
            {isLoadingCertis ? (
                <LoadingCircular Text=" Cargando Certificaciones..." />
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        width: '100%',
                        gap: '10px',
                    }}
                >
                    <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Typography component="h5" variant="h5" sxProps={{ color: `${theme.palette.text.secondary}` }}>
                            Mis Certificaciones ({calificacionData?.cursos[0]?.cursos.length ?? ''})
                        </Typography>
                        <ArrowForwardIosIcon />
                    </Box>

                    <Box sx={{ display: 'flex', mt: 1, flexDirection: 'column', gap: 2 }}>
                        {calificacionData?.cursos?.flatMap(periodo =>
                            periodo.cursos.map(curso =>
                                Certificaciones(curso.id_curso, curso.nombre_curso, curso.fecha_registro, curso.url_accredible ?? '')
                            )
                        )}
                    </Box>
                </Box>
            )}
        </>
    );
};
