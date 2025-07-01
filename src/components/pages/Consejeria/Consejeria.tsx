import React from 'react';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import { DescripcionesPantallas, TitleScreen } from '@constants';

const Consejeria: React.FC = () => {
    return (
        <ContainerDesktop title={TitleScreen.CONSEJERIA} description={DescripcionesPantallas.CURSOS_ACTIVOS}>
        </ContainerDesktop>
    );
};

export default Consejeria;