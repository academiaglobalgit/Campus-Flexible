import React from 'react';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import { TitleScreen, DescripcionesPantallas } from '@constants';
import { Box } from '@mui/material';

const AprendeMas: React.FC = () => {
    return (
        <ContainerDesktop title={TitleScreen.APRENDE_MAS} description={DescripcionesPantallas.APRENDE_MAS}>
            <Box>
            </Box>
        </ContainerDesktop>
    );
};

export default AprendeMas;