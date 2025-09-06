import React from 'react';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import { TitleScreen, DescripcionesPantallas } from '@constants';
import { Box } from '@mui/material';

const MiTrayecto: React.FC = () => {
    return (
        <ContainerDesktop title={TitleScreen.MI_TRAYECTO} description={DescripcionesPantallas.MI_TRAYECTO}>
            <Box>
            </Box>
        </ContainerDesktop>
    );
};

export default MiTrayecto;