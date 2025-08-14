import { Box, Grid, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ChatForoSalaConversacion } from "../../organisms/ChatForoSalaConversacion/ChatForoSalaConversacion"
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop"
import RichText from "../../molecules/RichText/RichText";
import React from "react";
import Button from "../../atoms/Button/Button";
import TabPanel from "../../molecules/TabPanel/TabPanel";
import { TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { SalaConversacion as IconSalaConversacion } from "@iconsCustomizeds";
import { GetIdConversacion } from "../../../services/ForosService";
import { useGetDatosModulos } from "../../../services/ModulosCampusService";
import { ModulosCampusIds } from "../../../types/modulosCampus";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import type { RichTextEditorRef } from "mui-tiptap";
import { innerHTMLStyle } from "@styles";

const tabsMessages = [
    { id: 0, label: 'Más Recientes' },
    { id: 1, label: 'Más Antiguos' },
];

const SalaConversacion: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const idTipoSala = 4;

    const { data: DatosSalaConversacion, isLoading } = GetIdConversacion(idTipoSala);
    const { data: salaDatos } = useGetDatosModulos(ModulosCampusIds.SALA_CONVERSACION);

    const [idConversacion, setIdConversacion] = React.useState(0);
    const [isDisabled, setIsDisabled] = React.useState(true);
    const [isSending, setIsSending] = React.useState(false);
    const [saveComentarioExterno, setSaveComentarioExterno] = React.useState<{ htmlContent: string, type: string } | null>(null);
    const [tabValue, setTabValue] = React.useState(0);

    const editorRef = React.useRef<RichTextEditorRef>(null);

    const handleHTMLContent = (html: string) => {
        setTimeout(() => setIsDisabled(html === '<p></p>'), 50);
    }

    React.useEffect(() => {
        if (DatosSalaConversacion) {
            const { id_conversacion } = DatosSalaConversacion.data[0]
            setIdConversacion(id_conversacion);
        }
    }, [DatosSalaConversacion]);

    const handleEnviarMensaje = () => {
        const html = editorRef.current?.editor?.getHTML() || "";

        setIsSending(true);
        setSaveComentarioExterno({ htmlContent: html, type: 'Comentar' });
    };

    const handleSaveComentarioExterno = () => {
        setIsSending(false);
        setIsDisabled(true);
        setSaveComentarioExterno(null);
        editorRef.current?.editor?.commands.setContent("");
    }

    const handleCancelar = () => {
        setIsDisabled(true);
        setSaveComentarioExterno(null);
        editorRef.current?.editor?.commands.setContent("");
    }

    const tabsSection = () => (
        <Tabs
            value={tabValue}
            onChange={(_, val) => setTabValue(val)}
        >
            {
                tabsMessages.map((item) => <Tab label={item.label} key={item.id} sx={{ minWidth: '150px', padding: '0px' }} />)
            }
        </Tabs>
    )

    const messageSection = () => (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={[
                    !isMobile && { display: 'flex', flexDirection: 'column', backgroundColor: '#F8F8F9', padding: '38px', borderRadius: '20px' },
                    isMobile && { display: 'flex', flexDirection: 'column' }
                ]}>
                    <Typography component="h4" variant="h4" color="primary">
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
                        <RichText ref={editorRef} onChange={handleHTMLContent} />
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
                            isLoading={isSending}
                            disabled={isDisabled}
                            onClick={handleEnviarMensaje}
                        >
                            Enviar
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={handleCancelar}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <Box >
                    {tabsSection()}
                    {
                        tabsMessages.map((_, index) => (
                            <TabPanel key={index} value={tabValue} index={index}>
                                <Box
                                    sx={{ height: '520px', maxHeight: '520px', overflow: 'scroll', overflowX: 'hidden', pt: 1 }}
                                >
                                    <ChatForoSalaConversacion
                                        idTipoSala={idTipoSala}
                                        idRecurso={idConversacion}
                                        showFiltros={false}
                                        showPagination={false}
                                        showComentarDialog={false}
                                        saveComentarioExterno={saveComentarioExterno}
                                        orderMessages={index} //0 DESC, 1 ASC
                                        onSaveComentarioExterno={handleSaveComentarioExterno}
                                    />
                                </Box>
                            </TabPanel>
                        ))
                    }
                </Box>
            </Grid>
        </Grid>
    );

    return (

        isMobile
            ?
            <>
                <TituloIcon Titulo={TitleScreen.SALA_CONVERSACIONES} Icon={IconSalaConversacion} />
                <Box sx={{ ...innerHTMLStyle, pl: 0, pr: 0 }} dangerouslySetInnerHTML={{ __html: salaDatos?.data?.descripcion_html ?? '' }} />
                <Box sx={{ pb: 5 }}>
                    {
                        isLoading
                            ?
                            <LoadingCircular Text="Iniciando Sala de conversación..." />
                            :
                            messageSection()
                    }
                </Box>
            </>
            :
            <ContainerDesktop title={TitleScreen.SALA_CONVERSACIONES} description={salaDatos?.data?.descripcion_html ?? ''}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', pb: 2 }}>
                </Box>
                {
                    isLoading
                        ?
                        <LoadingCircular Text="Iniciando Sala de conversación..." />
                        :
                        messageSection()
                }
            </ContainerDesktop>
    )
}

export default SalaConversacion;