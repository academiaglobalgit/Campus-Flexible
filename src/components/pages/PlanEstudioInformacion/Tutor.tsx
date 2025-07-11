import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Typography } from "../../atoms/Typography/Typography";
import { flexColumn, flexRows } from "@styles";
import { Avatar } from "../../atoms/Avatar/Avatar";

import type { Tutor as ITutor } from "@constants";

type TutorProps = {
    data: ITutor;
}

export const Tutor: React.FC<TutorProps> = ({ data }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const nombre = `${data.nombre} ${data.apellido_paterno} ${data.apellido_materno}`;
    const titulo = data.grado_estudio;
    const perfil = data.foto_perfil_url;
    const descripcion = data.descripcion_perfil;

    const Content = () => {
        return(
            <>
                <Box sx={{ ...flexRows, width: '100%', justifyContent: 'flex-start', gap: '20px', pb:2 }}>
                    <Avatar src={perfil} width={96} height={96} alt={nombre} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: '7px'}}>
                        <Typography component="h4" variant="h4" color="primary">{ nombre }</Typography>
                        <Typography component="span" variant="body1">{ titulo }</Typography>
                    </Box>
                </Box>
                <Box sx={{...flexColumn, alignItems: "flex-start", gap: '10px', pb: "30px"}}>
                    <Typography component="h4" variant="h4" color="primary">Conoce a tu tutor:</Typography>
                    <Typography component="span" variant="body1">
                        { descripcion }
                    </Typography>
                </Box>
            </>
        )
    }

    return(
        isMobile
        ?
            <Box sx={{pb:4}}>
                <Content />
            </Box>
        :
            <Box sx={{width: '100%', pt:'20px', display: 'flex', justifyContent: 'center'}}>
                <Box sx={{width: 'calc(100% - 300px)'}}>
                    <Content />
                </Box>
            </Box>
    );
}