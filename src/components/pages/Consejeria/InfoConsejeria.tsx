import React, { useEffect } from 'react';
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';
import { TitleScreen } from '@constants';
import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import { Users as ConsejeriaEstudiantil } from "@iconsCustomizeds";
import TabPanel from '../../molecules/TabPanel/TabPanel';
import { InformacionConsejeria } from './Informacion';
import { BlogConsejeria } from './Blog';
import { AgendaConsejeria } from './Agenda';
import { getTabSelected } from '../../../hooks/useLocalStorage';


const InfoConsejeria: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [tabValue, setTabValue] = React.useState(0);    

    const InfoTabs = [
        { tab: 'Información', content: <InformacionConsejeria /> },
        { tab: 'Blog', content: <BlogConsejeria /> },
        { tab: 'Agenda', content: <AgendaConsejeria /> },
    ];

    useEffect(() => {
        const indexTab = getTabSelected('consejeria-info');
        setTabValue(indexTab);
    },[]);

    const Content = () => {

        return (
            <>
                <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)} >
                    {
                        InfoTabs.map((item, i) => <Tab label={item.tab} key={i} sx={{ minWidth: '132px', padding: '0px' }} />)
                    }
                </Tabs>
                    {
                        InfoTabs.map((tab, i) => (
                            <TabPanel key={`tab${i}`} value={tabValue} index={i}>
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
        isMobile
            ?
                <>
                    <TituloIcon Titulo={TitleScreen.CONSEJERIA} Icon={ConsejeriaEstudiantil} />
                    {Content()}
                </>
            :
                <ContainerDesktop title={TitleScreen.CONSEJERIA} >
                    {Content()}
                </ContainerDesktop>
    );
};

export default InfoConsejeria;