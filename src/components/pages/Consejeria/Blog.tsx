import React from 'react';
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';
import { TitleScreen } from '@constants';
import { Typography } from "../../atoms/Typography/Typography";
import { Users as ConsejeriaEstudiantil } from "@iconsCustomizeds";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  useMediaQuery, useTheme} from "@mui/material";


const ConsejeriaBlog: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    function createData(
        name: string,
        date: string,
    ) {
        return { name, date };
    }

    const rows = [
        createData('Conferencia "Priorizando Actividades: Estrategias de Gestión del tiempo para estudiantes" (15:00 hrs. Tiempo Pacífico/ 16:00 hrs. Tiempo Centro)', '2024-01-17',),
        createData('Conferencia "Manejando el Estrés con Efectividad" (15:00 hrs. Tiempo Pacífico/ 16:00 hrs. Tiempo Centro)', '2024-02-14')

    ];

    function BasicTable() {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Evento</TableCell>
                            <TableCell align="center">Fecha</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.date}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }




    return (
        <>
            {
                isMobile
                    ?
                    <>
                        <TituloIcon Titulo={TitleScreen.CONSEJERIA} Icon={ConsejeriaEstudiantil} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, textAlign: 'center' }}>
                                AGENDA
                            </Typography>
                            {BasicTable()}

                            <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, textAlign: 'left' }}>
                                BLOG
                            </Typography>

                            <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, textAlign: 'left' }}>
                                COMUNICACIÓN ASERTIVA: CLAVE PARA UN CLIMA LABORAL POSITIVO
                            </Typography>
                            <Typography component="h5" variant="h5" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, textAlign: 'left' }}>
                                COMUNICACIÓN ASERTIVA: CLAVE PARA UN CLIMA LABORAL POSITIVO
                            </Typography>
                        </Box>
                    </>
                    :
                    <>
                        <TituloIcon Titulo={TitleScreen.CONSEJERIA} Icon={ConsejeriaEstudiantil} />
                        <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, mb: '20px' }}>
                            Esta Sala de Conversación es un espacio que ponemos a disposición de todas y todos nuestros estudiantes, con el propósito de que entables diálogos productivos, generen redes de contactos y amigos, compartan información, experiencias y aporten ideas que enriquezcan sus conocimientos.
                        </Typography>
                    </>
            }
        </>

    );
};

export default ConsejeriaBlog;