import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { ListaTareas } from "../../../assets/icons";
import { Typography } from "../../atoms/Typography/Typography";
import { CheckBoxLabel } from "../../atoms/Checkbox/Checkbox";

const lista = [
            { lista: 'Contenido', total: 4, hechas: 2 },
            { lista: 'Actividades', total: 4, hechas: 2 },
            { lista: 'Foros', total: 4, hechas: 2 },
            { lista: 'Evaluaciones', total: 4, hechas: 2 },
        ];
        
export const ListaPendientes: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return(

        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', gap: '18px' }}>
                <TituloIcon key={5} Titulo={'Lista de pendientes'} Icon={ListaTareas} />
            </Box>

            <Box sx={isMobile ? { display: 'flex', flexDirection: 'column' } : { display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'space-around', overflowX: 'scroll', marginTop: '20px', width: '100%', gap: '40px' }}>

                {lista.map((listado: { lista: string; total: number; hechas: number }) => (
                    <>

                        <Box sx={isMobile ? {} : { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>


                            <Box sx={{ width: '100%' }}>
                                <Divider textAlign="center">
                                    <Typography component="span" variant="body2" color="primary">{listado.lista}</Typography>
                                </Divider>
                            </Box>


                            <Box sx={isMobile ? { display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'space-around' } : { display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', width: '250px' }}>
                                {[...Array(4)].map((_, index) => {
                                    let auxTitulo = '';
                                    let auxChec = false;
                                    // let auxDisabled = false;
                                    if (listado.lista == 'Contenido') {
                                        auxTitulo = 'Unidad'
                                    } else if (listado.lista == 'Actividades') {
                                        auxTitulo = 'Actividad'
                                    } else if (listado.lista == 'Foros') {
                                        auxTitulo = 'Foros'
                                    } else if (listado.lista == 'Evaluaciones') {
                                        auxTitulo = 'Evaluaciones'
                                    }

                                    if (index + 1 <= [...Array(listado.hechas)].length) {
                                        auxChec = true;
                                        // auxDisabled = true;
                                    } else {
                                        auxChec = false;
                                        // auxDisabled = false;
                                    }

                                    return (
                                        <CheckBoxLabel
                                            key={index}
                                            text={`${auxTitulo} ${index + 1}`}
                                            place="start"
                                            defaultChecked={auxChec}
                                            sxProps={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                                color: theme.palette.primary.main,
                                                gap: '15px',
                                                marginRight: '20px'
                                            }}
                                        />
                                    );
                                })}


                            </Box>
                        </Box>
                        <Box sx={isMobile ? {} : {
                            height: '215px', border: 'solid 1px', color: theme.palette.primary.main, marginTop: '30px'
                        }}></Box >

                    </>
                ))}
            </Box>

        </>
    )
}