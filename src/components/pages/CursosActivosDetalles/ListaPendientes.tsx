import { useParams } from "react-router-dom";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { ListaTareas } from "../../../assets/icons";
import { Typography } from "../../atoms/Typography/Typography";
import { flexColumn, flexRows } from "@styles";
import { useGetListaPendientes } from "../../../services/CursosActivosService";

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import type { ListaPendientes as IListaPendientes } from "@constants";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";

export const ListaPendientes: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const {id} = useParams<{id:string}>();

    const { data: lista, isLoading } = useGetListaPendientes(Number(id!))
    
    const getTitleDivider = (opcion: string) => {
        switch(opcion) {
            case 'actividad': return 'Actividades';
            case 'foro': return 'Foros';
            case 'contenido': return 'Contenido';
            case 'evaluacion': return 'Evaluaciones';
            default: return 'Otros';
        }
    }

    const Sections = (items: IListaPendientes[]) => {
        return(
            <Box sx={{...flexColumn, alignItems: 'normal', gap: '10px' }}>
                {
                    items.map((item, i) => (
                        <Box key={i} sx={{...flexRows, justifyContent: 'space-between'}}>
                            <Typography component="span" variant="body2" color="primary">{item.titulo}</Typography>
                            {
                                item.entregado === 1 ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="disabled" />
                            }
                        </Box>
                    ))
                }
            </Box>
        )
    }

    return(
        isLoading
        ?
            <LoadingCircular Text="Cargando Lista de pendientes..." />
        :
        <>
            <Box sx={{...flexColumn, alignItems: 'flex-start', gap: '18px' }}>
                <TituloIcon key={5} Titulo={'Lista de pendientes'} Icon={ListaTareas} />
            </Box>
            
                {
                    isMobile
                    ?
                        <Box>
                            {
                                lista && Object.entries(lista).map(([title, items], index) => (
                                    <Box key={index} sx={{width: '100%'}}>
                                        <Divider textAlign="center">
                                            <Typography component="span" variant="body2" color="primary">{getTitleDivider(title)}</Typography>
                                        </Divider>
                                        { 
                                            Sections(items)
                                        }
                                    </Box>
                                ))
                            }
                        </Box>
                    :

                    <Box sx={{ overflowY: 'auto' }}>
                        <Box
                            display="grid"
                            gridTemplateColumns={{
                                xs: '1fr',
                                sm: '1fr 1fr',
                                md: '1fr 1fr 1fr'
                            }}
                            gap={2}
                        >
                            {
                                lista && Object.entries(lista).map(([title, items], index) => (
                                    <Box key={index} sx={{pr: 2, borderRight: `1px solid ${theme.palette.grey[300]}`, minHeight: '200px', pb: 3}}>
                                        <Divider textAlign="center" sx={{mt: '0px'}}>
                                            <Typography component="span" variant="body2" color="primary">{getTitleDivider(title)}</Typography>
                                        </Divider>
                                            { 
                                                Sections(items)
                                            }
                                    </Box>
                                ))
                            }
                        </Box>
                    </Box>
                }
        </>
    )
}