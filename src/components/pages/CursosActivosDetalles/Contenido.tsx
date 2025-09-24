import { useParams } from "react-router-dom";
import { useGetContenidoTabs } from "../../../services/CursosActivosService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { accordionStyle } from "@styles";
import { AccordionStatus } from "../../molecules/AccordionStatus/AccordionStatus";
import StatusIcon from "../../molecules/StatusIcon/StatusIcon";

export const Contenido: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: contenido, isLoading } = useGetContenidoTabs(Number(id!), "Contenido");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if(isLoading) 
        return <LoadingCircular Text="Cargando Contenido..." />
        
    return (
        contenido?.data.map((item, index) => 
            <Accordion 
                key={index}
                title={item.titulo_elemento}
                customHeader={!isMobile ? <AccordionStatus tittle={item.titulo_elemento} status={item.estatus} /> : undefined}
                sxProps={accordionStyle}
            >
                {
                    isMobile && <Box sx={{ padding: '10px' }}>
                        <StatusIcon estado={item.estatus} />
                    </Box>
                }
                <Box>
                    <iframe
                        src={item?.url}
                        style={{
                            width: "100%",
                            height: "100vh",
                            border: "none",
                        }}
                    />
                </Box>
            </Accordion>
        )
    );
};