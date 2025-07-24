import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import {Foros as ForosIcon, Edit1 } from "@iconsCustomizeds";
import { DividerSection } from "../../molecules/DividerSection/DividerSection";
import Button from "../../atoms/Button/Button";
import { innerHTMLStyle } from "@styles";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { GetTemaForoById } from "../../../services/ForosService";

import { getForoSelected } from "../../../hooks/useLocalStorage";
import { ChatForoSalaConversacion } from "../../organisms/ChatForoSalaConversacion/ChatForoSalaConversacion";

const Foros: React.FC = () => {
    const theme = useTheme();
    const { id } = useParams<{id:string}>();
    const { refetch } = GetTemaForoById(Number(id!), {enabled: false});    
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [isOpenComentarDialog, setIsOpenComentarDialog] = React.useState(false);
    const [temaData, setTemaData] = React.useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const foroSelected = getForoSelected();
                if(foroSelected !== "") {
                    setTemaData(JSON.parse(foroSelected));
                }else{
                    const response = await refetch();
                    const dataArray = response.data?.data[0];
                    setTemaData(dataArray);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, refetch]);

    const ComentarButtonSection = () => {
        return( temaData && 
            <Box>
                <DividerSection Title={ temaData.titulo_elemento } />
                <Box sx={{...innerHTMLStyle}} dangerouslySetInnerHTML={{__html: temaData.contenido_elemento}} />
                <Box sx={{ width: '100%', mt: '32px' }}>
                    <Button 
                        fullWidth
                        onClick={() => setIsOpenComentarDialog(true)}
                        icon={<Edit1 />}
                    >
                        Comentar
                    </Button>
                </Box>
            </Box>
        );
    }

  return (
    <>
        {
            isMobile 
                ?
                    <>
                        <TituloIcon Titulo="Foros" Icon={ForosIcon} />
                        <ComentarButtonSection />
                        <ChatForoSalaConversacion 
                            idRecurso={Number(id!)} 
                            showFiltros={true} 
                            showPagination={true} 
                            showComentarDialog={isOpenComentarDialog}
                            onCloseComentarDialog={() => setIsOpenComentarDialog(false)} 
                        />
                    </>
                :
                    <ContainerDesktop title="Foros">
                        <ComentarButtonSection />
                        <ChatForoSalaConversacion 
                            idRecurso={Number(id!)} 
                            showFiltros={true} 
                            showPagination={true} 
                            showComentarDialog={isOpenComentarDialog}
                            onCloseComentarDialog={() => setIsOpenComentarDialog(false)} 
                        />
                    </ContainerDesktop>
        }
    </>
    
  );
}

export default Foros;