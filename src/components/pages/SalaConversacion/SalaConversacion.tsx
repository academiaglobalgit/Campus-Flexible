import React from 'react';
import { ContainerDesktop } from '../../organisms/ContainerDesktop/ContainerDesktop';
import { TitleScreen, DescripcionesPantallas } from '@constants';
import { Typography } from "../../atoms/Typography/Typography";
import RichText from '../../molecules/RichText/RichText';
import { Box, Tab, Tabs, tabsClasses, useMediaQuery, useTheme } from "@mui/material";
import Button from '../../atoms/Button/Button';
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { Avatar } from "../../atoms/Avatar/Avatar";
import { flexColumn } from "@styles";
import { SalaConversacion as sala } from "@iconsCustomizeds";
import { ComentariosDialog } from "../../molecules/Dialogs/ForosDialog/ForosDialog";
import { EliminarComentarioDialog } from "../../molecules/Dialogs/EliminarComentarioDialog/EliminarComentarioForosDialog";
import { TituloIcon } from '../../molecules/TituloIcon/TituloIcon';

const SalaConversacion: React.FC = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [typeDialog, setTypeDialog] = React.useState<'Comentar' | 'Editar' | 'Responder'>("Comentar");
    const [isOpenForosDialog, setIsOpenForosDialog] = React.useState(false);
    const [isOpenEliminarComentarioDialog, setIsOpenEliminarComentarioDialog] = React.useState(false);


    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleOpenComentariosDialog = (type: 'Comentar' | 'Editar' | 'Responder' = 'Comentar') => {
        setTypeDialog(type);
        setIsOpenForosDialog(true)
    };
    const [value, setValue] = React.useState(0);

    const SalaConversacion = () => {

        return (
            <>

                <Box sx={isMobile ? {} : { width: '90%' }}>

                    <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, width: '90%' }}>
                        La Sala es de uso libre, el único requisito para participar en ella, es estar inscrito(a) y activo(a) en alguno de los programas de Academia Global, así como expresarse siempre con respeto hacia todos sus compañeros y compañeras.
                    </Typography>

                    <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, mt: '20px', width: '90%' }}>
                        Si tienes alguna duda o inquietud respecto del programa en el que estás participando, comunícala a través de los demás medios diseñados para ello.
                    </Typography>

                    <Box sx={isMobile ? {} : { display: 'flex', flexDirection: 'row', mt: '61px', ml: '61px', gap: '84px' }} >

                        <Box sx={isMobile ? {} : { display: 'flex', flexDirection: 'column', width: '50%', backgroundColor: '#F8F8F9', paddingInline: '38px', borderRadius: '20px' }}>
                            <Typography component="h4" variant="h4" sxProps={{ color: theme.palette.primary.dark, fontFamily: theme.typography.fontFamily, mt: '32px' }}>
                                Inicia un nuevo chat
                            </Typography>

                            <Box
                                sx={{
                                    width: '100%',
                                    height: '281px',
                                    backgroundColor: '#FFF',
                                    mt: '20px'
                                }}
                            >
                                <RichText />
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    marginTop: '10px'

                                }}
                            >
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => { }}
                                >
                                    Enviar                </Button>

                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => { }}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={isMobile ? { mt: '23px' } : { display: 'flex', flexDirection: 'column', width: '50%' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"

                                aria-label="visible arrows tabs example"
                                sx={{
                                    [`& .${tabsClasses.scrollButtons}`]: {
                                        '&.Mui-disabled': { opacity: 0.3 },
                                    },
                                }}
                            >
                                <Tab label="Más Recientes" key={1} sx={{ minWidth: '150px', padding: '0px' }} />
                                <Tab label="Más Antiguos" key={2} sx={{ minWidth: '150px', padding: '0px' }} />

                            </Tabs>

                            <TabPanel key={0} value={value} index={0}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '26px', mt: '40px' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', pb: '20px' }}>
                                        <Box
                                            sx={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F1F4F6', padding: '8px 15px 8px 15px', borderBottom: '1px solid #AAB1B6', borderRadius: '4px 4px 0px 0px' }}>
                                            <Avatar
                                                src="https://i.pravatar.cc/150?img=3"
                                                alt="Avatar"
                                                width={48}
                                                height={48}
                                            />
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography component="span" variant="body2">
                                                    Martín Sánchez
                                                </Typography>
                                                <Typography component="span" variant="body1" color="disabled">
                                                    26/Junio/2025 12:00:00PM
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{ ...flexColumn, alignItems: 'flex-start', gap: '10px', p: '15px', backgroundColor: '#F8F8F9', width: '100%', height: '100px', borderRadius: '0px 0px 4px 4px' }}
                                        >
                                            <Typography component="span" variant="body2">
                                                Este es un comentario de prueba
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: '15px', width: '100%' }}>
                                                <><Button
                                                    fullWidth
                                                    onClick={() => handleOpenComentariosDialog('Editar')}
                                                    variant="outlined"
                                                    sxProps={{ height: '26px' }}
                                                >Editar</Button></>
                                                <><Button fullWidth onClick={() => setIsOpenEliminarComentarioDialog(true)} variant="outlined" color="error" sxProps={{ height: '26px' }}>Eliminar</Button></>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', pb: '20px' }}>
                                        <Box
                                            sx={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#F1F4F6', padding: '8px 15px 8px 15px', borderBottom: '1px solid #AAB1B6', borderRadius: '4px 4px 0px 0px' }}>
                                            <Avatar
                                                src="https://i.pravatar.cc/150?img=10"
                                                alt="Avatar"
                                                width={48}
                                                height={48}
                                            />
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography component="span" variant="body2">
                                                    Alejandra Ramírez                                </Typography>
                                                <Typography component="span" variant="body1" color="disabled">
                                                    26/Junio/2025 12:00:00PM
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{ ...flexColumn, alignItems: 'flex-start', gap: '10px', p: '15px', backgroundColor: '#F8F8F9', width: '100%', height: '100px', borderRadius: '0px 0px 4px 4px' }}
                                        >
                                            <Typography component="span" variant="body2">
                                                Este es un comentario de prueba
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: '15px', width: '100%' }}>
                                                <><Button
                                                    fullWidth
                                                    onClick={() => handleOpenComentariosDialog('Responder')}
                                                    variant="outlined"
                                                    sxProps={{ height: '26px' }}
                                                >Reponder
                                                </Button></>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </TabPanel>
                        </Box>
                    </Box >
                </Box>

            </>
        )
    }

    return (

        <>
            {
                isMobile
                    ?
                    <>
                        <TituloIcon Titulo={TitleScreen.SALA_CONVERSACIONES} Icon={sala} />
                        <Typography component="p" variant="body1" sxProps={{ color: theme.palette.text.primary, fontFamily: theme.typography.fontFamily, mb: '20px' }}>
                            Esta Sala de Conversación es un espacio que ponemos a disposición de todas y todos nuestros estudiantes, con el propósito de que entables diálogos productivos, generen redes de contactos y amigos, compartan información, experiencias y aporten ideas que enriquezcan sus conocimientos.
                        </Typography>
                        {SalaConversacion()}

                    </>
                    :
                    <ContainerDesktop title={TitleScreen.SALA_CONVERSACIONES} description={DescripcionesPantallas.SALA_CONVERSACION}>
                        {SalaConversacion()}
                    </ContainerDesktop>
            }
            <ComentariosDialog isOpen={isOpenForosDialog} close={() => setIsOpenForosDialog(false)} type={typeDialog} />
            <EliminarComentarioDialog isOpen={isOpenEliminarComentarioDialog} close={() => setIsOpenEliminarComentarioDialog(false)} />
        </>
    );
};

export default SalaConversacion;