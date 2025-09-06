import React from 'react';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import { TitleScreen, DescripcionesPantallas } from '@constants';
import { Box } from '@mui/material';

const Pizarron: React.FC = () => {
    return (
        <ContainerDesktop title={TitleScreen.PIZARRON} description={DescripcionesPantallas.PIZARRON}>
            <Box>
            </Box>
        </ContainerDesktop>
    );
};

export default Pizarron;