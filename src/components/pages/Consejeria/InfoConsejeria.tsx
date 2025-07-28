import React from 'react';
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';
import { TitleScreen } from '@constants';
import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import { Users as ConsejeriaEstudiantil } from "@iconsCustomizeds";
import TabPanel from '../../molecules/TabPanel/TabPanel';
import { InformacionConsejeria } from './Informacion';
import { BlogConsejeria } from './Blog';
import { AgendaConsejeria } from './Agenda';

const InfoTabs = [
    { tab: 'Informaciòn', content: <InformacionConsejeria /> },
    { tab: 'Blog', content: <BlogConsejeria /> },
    { tab: 'Agenda', content: <AgendaConsejeria /> },
];

const InfoConsejeria: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [tabValue, setTabValue] = React.useState(0);

    const tabsSecciones = [
        { id: 0, label: 'Informaciòn' },
        { id: 1, label: 'Blog' },
        { id: 1, label: 'Agendar cita' },
    ];


    const tabsSection = () => (
        <Tabs
            value={tabValue}
            onChange={(_, val) => setTabValue(val)}
        >
            {
                tabsSecciones.map((item) => <Tab label={item.label} key={item.id} sx={{ minWidth: '132px', padding: '0px' }} />)
            }
        </Tabs>
    )

    const Content = () => {

        return (
            <>

                <Box sx={{ alignItems: 'start', gap: '20px', width: '50%' }}>
                    {tabsSection()}
                </Box>
                {
                    InfoTabs.map((tab, i) => (
                        <TabPanel key={i} value={tabValue} index={i}>
                            <Box sx={{ pt: 2 }}>
                                {tab.content}
                            </Box>
                        </TabPanel>
                    ))
                }

            </>
        )
    }

    return (
        <>
            {
                isMobile
                    ?
                    <>
                        <TituloIcon Titulo={TitleScreen.CONSEJERIA} Icon={ConsejeriaEstudiantil} />
                        {Content()}
                    </>
                    :
                    <>
                        <ContainerDesktop title={TitleScreen.CONSEJERIA} >
                            {Content()}
                        </ContainerDesktop>
                    </>
            }
        </>

    );
};

export default InfoConsejeria;