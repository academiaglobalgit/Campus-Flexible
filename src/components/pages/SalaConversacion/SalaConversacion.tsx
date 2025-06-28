import React from 'react';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import { TitleScreen, DescripcionesPantallas } from '@constants';
import { Box } from '@mui/material';

const SalaConversacion: React.FC = () => {
    return (
        <ContainerDesktop title={TitleScreen.SALA_CONVERSACIONES} description={DescripcionesPantallas.SALA_CONVERSACION}>
            <Box>
            </Box>
        </ContainerDesktop>
    );
};

export default SalaConversacion;