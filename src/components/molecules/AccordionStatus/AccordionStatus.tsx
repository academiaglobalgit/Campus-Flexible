import React from 'react';
import { Typography } from '../../atoms/Typography/Typography';
import { Box, type SxProps, type Theme } from '@mui/material';
import StatusIcon from '../StatusIcon/StatusIcon';


type StatusAccordionProps = {
    tittle: string;
    status: string;
    sxProps?: SxProps<Theme> | undefined;
};

export const AccordionStatus: React.FC<StatusAccordionProps> = ({ tittle, status, sxProps }) => {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', ...sxProps }}>
                <Typography component="span" variant="subtitle1">
                    {tittle}
                </Typography>
                <Box sx={{ pr: 2, display: 'flex', justifyContent: 'flex-start' }}>
                    <StatusIcon estado={status} />
                </Box>
            </Box>
        </>
    )
};
