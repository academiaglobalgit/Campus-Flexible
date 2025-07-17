import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography } from '../../atoms/Typography/Typography';
import DsSvgIcon from '../../atoms/Icon/Icon';
import { Box } from '@mui/material';
import { Loading } from '../../../assets/icons';
import DoneIcon from '@mui/icons-material/Done';
import LockOutlineIcon from '@mui/icons-material/LockOutline';

export interface StatusIconProps {
    estado: string;
}

const StatusIcon: React.FC<StatusIconProps> = ({ estado }) => {
    const theme = useTheme();

    let color: "success" | "primary" | "info" | "warning" | "disabled" | undefined;
    let icon: any;

    if (estado === "Finalizado") {
        color = "success";
        icon = DoneIcon;
    } else if (estado === "Cursando") {
        color = "warning";
        icon = Loading;
    } else if (estado === "Sin iniciar") {
        color = "disabled";
        icon = LockOutlineIcon;
    } else {
        color = undefined;
    }

    return (
        <>
            <Box sx={[
                { color: theme.palette.primary.dark, display: 'flex', flexDirection: 'row', gap: '1.5rem', justifyContent: 'flex-start'},
            ]}>
                <Typography component="span" variant="subtitle1" color={color} >
                    {estado}
                </Typography>
                <DsSvgIcon component={icon} color={color} sxProps={{ fill: 'currentcolor !important' }} />
            </Box>
        </>
    )
};

export default StatusIcon;