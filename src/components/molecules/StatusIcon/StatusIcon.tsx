import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography } from '../../atoms/Typography/Typography';
import DsSvgIcon from '../../atoms/Icon/Icon';
import { Box, useMediaQuery } from '@mui/material';
import { Loading } from '../../../assets/icons';
import DoneIcon from '@mui/icons-material/Done';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import ClearIcon from '@mui/icons-material/Clear';

export interface StatusIconProps {
    estado: string;
}

const StatusIcon: React.FC<StatusIconProps> = ({ estado }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    let color: "success" | "primary" | "info" | "warning" | "disabled" | "secondary" | undefined;
    let icon: any;

    if (estado === "Finalizado") {
        color = "success";
        icon = DoneIcon;
    } else if (estado === "Cursando") {
        color = "warning";
        icon = Loading;
    } else if (estado === "Sin Iniciar") {
        color = "disabled";
        icon = LockOutlineIcon;
    } else if (estado === "Reprobado") {
        color = "secondary";
        icon = ClearIcon;
    } else {
        color = undefined;
    }

    return (
        <>
            <Box sx={[
                { color: theme.palette.primary.dark, display: 'flex', flexDirection: 'row', gap: '1.5rem', justifyContent: isMobile ? 'space-between' : 'flex-start' },
            ]}>
                <Typography component="span" variant={isMobile ? 'body2' : 'h4'} color={color} >
                    {estado}
                </Typography>
                <DsSvgIcon component={icon} color={color} sxProps={{ fill: 'currentcolor !important' }} />
            </Box>
        </>
    )
};

export default StatusIcon;