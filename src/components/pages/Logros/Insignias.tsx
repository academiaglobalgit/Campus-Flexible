import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InsigniaBasica from "../../../assets/mis_insignias.png";
import { MedallaLogros } from "../../molecules/MedallaLogros/MedallaLogros";

const InsigniasData = [

    { id: 1, mensaje: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', racha: 'Racha de 10', fecha: "27/09/25" },
    { id: 1, mensaje: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', racha: 'Racha de 10', fecha: "27/09/25" },
    { id: 1, mensaje: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', racha: 'Racha de 10', fecha: "27/09/25" },
    { id: 1, mensaje: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', racha: 'Racha de 10', fecha: "27/09/25" },
];

export const Insignias: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const totalInsignias = InsigniasData.length;

    const Insignia = (id: number, racha: string, mensaje: string, fecha: string) => {
        return (
            <Box key={id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '276px', padding: '10px', gap: '10px' }}>

                <Box
                    component="img"
                    src={InsigniaBasica}
                    alt="medalla"
                    sx={{ width: '60px', height: '60px' }}
                />
                <Typography component="h4" variant="h4" color="primary"> {racha} </Typography>
                <Typography component="span" variant="body1" color="text" sxProps={{ textAlign: 'center' }}>
                    {mensaje}
                </Typography>
                <Typography component="span" variant="body1" color="primary" sxProps={{ textAlign: 'center' }}>
                    Más Reciente: {fecha}
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#F1F4F6', borderRadius: '20px', maxHeight: '520px', }}>

                {isMobile && <MedallaLogros nivel="Principiante" progreso="100" />}

                <Box sx={{ display: 'flex', mt: 1, flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: isMobile ? 'center' : 'space-between', gap: 4, m: 2, width: '100%', }}>

                    <Box sx={{ display: 'flex', mt: 1, flexDirection: 'row', alignItems: 'center', gap: 4, m: 2 }}>

                        <Typography component="h5" variant="h5" sxProps={{ color: theme.palette.text.secondary }}>
                            Mis Insignias
                        </Typography>
                        <ArrowForwardIosIcon />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: 'black', padding: '12px 22px;', borderRadius: '10px', mr: 4 }}>
                        <Typography component="span" variant="body3" sxProps={{ color: '#fff' }}>
                            {totalInsignias}
                        </Typography>
                        <Box
                            component="img"
                            src={InsigniaBasica}
                            alt="medalla"
                            sx={{ width: '25px', height: '25px' }}
                        />
                    </Box>

                </Box>

                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', width: '100%', overflowY: 'auto', backgroundColor: '#F1F4F6', flexWrap: 'wrap', p: '5pox', marginBottom: '50px' }}>

                    {
                        InsigniasData.map((item, index) => (
                            Insignia(
                                index,
                                item.racha,
                                item.mensaje,
                                item.fecha
                            )
                        ))
                    }
                </Box>

            </Box >
        </>
    );
};
