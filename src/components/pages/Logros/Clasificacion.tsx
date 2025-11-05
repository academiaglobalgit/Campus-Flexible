import React from "react";
import { Box, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DsSvgIcon from "../../atoms/Icon/Icon";
import { UserOctagon } from "@iconsCustomizeds";

const recursos = [
    { recurso: 'Video introductorio', valor: 'https://youtu.be/abc123', calificacion: 9.5 },
    { recurso: 'PDF de la unidad 1', valor: 'https://misitio.com/unidad1.pdf', calificacion: 8.0 },
    { recurso: 'Presentación PowerPoint', valor: 'https://misitio.com/slides.pptx', calificacion: 7.3 },
    { recurso: 'Enlace a foro de discusión', valor: 'https://foro.academiaglobal.mx', calificacion: 10 },
    { recurso: 'Quiz de repaso', valor: 'https://misitio.com/quiz', calificacion: 6.5 },
];

export const Clasificacion: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            color: 'black',
            fontWeight: 'bold',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 16,
        },
    }));

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
            backgroundColor: 'none',
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const totalClasificacion = recursos.length;


    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#F1F4F6', height: '350px', borderRadius: '20px' }}>
                <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 4, m: 2 }}>

                    <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', gap: 4, m: 2 }}>
                        <Typography component="h5" variant="h5" sxProps={{ color: theme.palette.text.secondary }}> 
                            Clasificación General 
                    </Typography>
                    <ArrowForwardIosIcon />
                    </Box>

                    {!isMobile && <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', gap: 4, m: 2, backgroundColor: 'black', padding: '10px 30px', borderRadius: '10px' }}>
                        <Typography component="span" variant="body3" sxProps={{ color: '#fff' }}>
                            No. {totalClasificacion}
                        </Typography>
                        <DsSvgIcon component={UserOctagon} color={isMobile ? "primary" : "white"} />
                    </Box>}

                </Box>

                <TableContainer component={Paper} sx={{ backgroundColor: '#F1F4F6' }}>
                    <Table sx={{ minWidth: 313 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Posición</StyledTableCell>
                                <StyledTableCell align="center">Usuario</StyledTableCell>
                                <StyledTableCell align="center">Total de insignias</StyledTableCell>
                                <StyledTableCell align="center">Certificaciones</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {recursos.map((row: any, i: number) => (
                                <StyledTableRow key={i}>
                                    <StyledTableCell align="center">{row.recurso}</StyledTableCell>
                                    <StyledTableCell align="center">{row.valor}</StyledTableCell>
                                    <StyledTableCell align="center">{row.calificacion}</StyledTableCell>
                                    <StyledTableCell align="center">{row.calificacion}</StyledTableCell>
                                </StyledTableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};
