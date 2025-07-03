import React from 'react';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import { TitleScreen, DescripcionesPantallas } from '@constants';
import { Box } from '@mui/material';

const BoletinEducativo: React.FC = () => {
    return (
        <ContainerDesktop title={TitleScreen.BOLETIN_EDUCATIVO} description={DescripcionesPantallas.BOLETIN_EDUCATIVO}>
            <Box>
            </Box>
        </ContainerDesktop>
    );
};

export default BoletinEducativo;