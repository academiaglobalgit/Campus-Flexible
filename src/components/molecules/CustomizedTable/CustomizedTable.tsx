import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type { Recurso } from '../../../types/Calificaciones.interface';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type CustomizedTableProps = {
  recursos: Recurso[]
}

const CustomizedTable: React.FC<CustomizedTableProps> = ({recursos}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 313 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Recurso</StyledTableCell>
            <StyledTableCell align="center">Valor</StyledTableCell>
            <StyledTableCell align="center">Calificación</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recursos.map((row, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell align="center">{row.recurso}</StyledTableCell>
              <StyledTableCell align="center">{row.valor}</StyledTableCell>
              <StyledTableCell align="center">{row.calificacion}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTable;