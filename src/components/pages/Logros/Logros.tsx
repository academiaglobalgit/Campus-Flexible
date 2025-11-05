import React from "react";
import { Box, Card, Tab, Tabs, tabsClasses, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { MedallaLogros } from "../../molecules/MedallaLogros/MedallaLogros";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { useGetDatosModulos } from "../../../services/ModulosCampusService";
import { ModulosCampusIds } from "../../../types/modulosCampusIds";
import { MisLogros as iconLogros } from "@iconsCustomizeds";
import { TitleScreen } from "@constants";
import { innerHTMLStyle } from "@styles";
import { DescripcionesPantallas } from '@constants';
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { Insignias } from "./Insignias";
import { Certificaciones } from "./Certificaciones";
import { Clasificacion } from "./Clasificacion";

type statsCard = {
    title: string,
    description: string,
    color?: string,
}

const logrosTabs = [
    { id: 1, tab: 'Mis Certificaciones', content: <Certificaciones />, hidden: false, order: 1 },
    { id: 2, tab: 'Mis Insignias', content: <Insignias />, hidden: false, order: 2 },
    { id: 3, tab: 'Mi Clasificación', content: <Clasificacion />, hidden: false, order: 3 },
];

const Logros: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { data: Logros, isLoading } = useGetDatosModulos(ModulosCampusIds.LOGROS);
    const [value, setValue] = React.useState(1);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const Stats: statsCard[] = [
        { title: '125 horas', description: 'En plataforma', color: 'primary.300' },
        { title: '3 de 10', description: 'Certificaciones', color: 'warning.main' },
        { title: '5 cursos', description: 'Concluidos', color: 'warning.main' },
    ]

    const StatsCard = ({
        title,
        description,
        color
    }: statsCard): React.ReactNode => (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '16px',
                maxWidth: isMobile ? '100%' : '188px',
                width: '100%',
            }}
        >
            <Card
                sx={{
                    backgroundColor: `${color}`,
                    borderRadius: '12px',
                    padding: '12px 22px',
                    textAlign: 'center',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Typography
                    variant="h5"
                    component="span"
                    sxProps={{
                        color: '#fff',
                        fontWeight: 'bold',
                        marginBottom: '4px',
                    }}
                // sx={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px' }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="body2"
                    component="div"
                    sxProps={{
                        color: '#fff',
                        opacity: 0.9
                    }}
                // sx={{ color: '#fff', opacity: 0.9 }}
                >
                    {description}
                </Typography>
            </Card>

        </Box>
    );

    const ContenTabs = () => {
        return <>
            <Box sx={{ display: 'flex' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="visible arrows tabs example"
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': { opacity: 0.3 },
                        },
                    }}
                >
                    {
                        logrosTabs
                            .filter(item => !item.hidden)
                            .sort((a, b) => a.order - b.order)
                            .map((item) =>
                                <Tab label={item.tab} value={item.id} key={item.id} sx={{ minWidth: '150px', padding: '0px' }} />
                            )
                    }
                </Tabs>
            </Box>

            {
                logrosTabs
                    .filter(tab => !tab.hidden)
                    .sort((a, b) => a.order - b.order)
                    .map((tab) => (
                        <TabPanel key={tab.id} value={value} index={tab.id}>
                            <Box sx={{ pt: 2 }}>
                                {tab.content}
                            </Box>
                        </TabPanel>
                    ))
            }
        </>
    }

    const Insignias = (
        <Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '60px' }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <Box sx={{ ...innerHTMLStyle, pl: 0, pr: 0 }} dangerouslySetInnerHTML={{ __html: Logros?.data?.descripcion_html ?? DescripcionesPantallas.LOGROS }} />
                    {!isMobile && <Typography component="h4" variant="h4" color="primary">
                        Mi progreso en plataforma
                    </Typography>}
                    <Box sx={isMobile ? { display: 'flex', flexDirection: 'column', gap: '30px' } : { display: 'flex', gap: '30px' }}>
                        {
                            Stats.map((item, index) => (
                                <StatsCard
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    color={item.color}
                                />
                            ))
                        }
                    </Box>
                </Box>

                {!isMobile && <MedallaLogros nivel="Principiante" progreso="100" />}
            </Box>

        </Box>
    );

    return (

        isLoading
            ?
            <LoadingCircular Text="Cargando Logros..." /> :
            isMobile
                ?
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <TituloIcon Titulo={TitleScreen.LOGROS} Icon={isMobile && iconLogros} fontSize="h2" />
                        {Insignias}
                        {ContenTabs()}
                    </Box>
                </>
                :
                <>
                    <ContainerDesktop title={TitleScreen.LOGROS} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'auto', gap: '15px' }}>
                            <Box sx={{ display: 'flex' }}>
                                {Insignias}
                            </Box>
                            {ContenTabs()}
                        </Box>
                    </ContainerDesktop>
                </>
    );
};

export default Logros;