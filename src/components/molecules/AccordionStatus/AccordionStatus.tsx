import React from 'react';
import { Typography } from '../../atoms/Typography/Typography';
import { Box} from '@mui/material';
import StatusIcon from '../StatusIcon/StatusIcon';


type StatusAccordionProps = {
    tittle: string;
    status: string;
};


export const AccordionStatus: React.FC<StatusAccordionProps> = ({ tittle, status }) => {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Typography component="span" variant="subtitle1">
                    {tittle}
                </Typography>
                <Box sx={{ pr: 2 }}>
                    <StatusIcon estado={status} />
                </Box>
            </Box>
        </>
    )
};
