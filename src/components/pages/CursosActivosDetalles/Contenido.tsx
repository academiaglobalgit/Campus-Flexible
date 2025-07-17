import { useParams } from "react-router-dom";
import { useGetCursosContenidoById } from "../../../services/CursosActivosService";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { Box, Typography } from "@mui/material";
import { toRoman } from "../../../utils/Helpers";
import { accordionStyle } from "@styles";

export const Contenido: React.FC = () => {
    const {id} = useParams<{id:string}>();    
    const {data: contenido, isLoading} = useGetCursosContenidoById(Number(id!))

    return(
        isLoading ?
            <LoadingCircular Text="Cargando Contenido..." />
        :

         Object.entries(contenido).map(([unidad, contenidos], index) =>
            <Accordion key={index} title={`Unidad ${toRoman(Number(unidad))}`} sxProps={accordionStyle}>
                {
                    contenidos.filter((item) => item.unidad === Number(unidad)).map((item, i) => (
                        <Box key={i}>
                            <Typography 
                                variant="body1"
                                component="div"
                                dangerouslySetInnerHTML={{ __html: item.contenido_elemento }} 
                            />
                        </Box>
                    ))
                }
                
            </Accordion>      
        )
    )
};