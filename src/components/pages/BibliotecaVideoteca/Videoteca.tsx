import { AppRoutingPaths, TitleScreen, type BibliotecaVideoteca } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Document } from "../../../assets/icons";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Button from "../../atoms/Button/Button";
import { useNavigate } from "react-router-dom";

type BibliotecaProps = {
    data: BibliotecaVideoteca;
}

export const Videoteca: React.FC<BibliotecaProps> = ({data}) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleAcceder = () => {
        navigate(AppRoutingPaths.VIDEOTECA_DETALLE);
    }

    return(
        <>
          <TituloIcon Titulo={TitleScreen.VIDEOS_LECTURAS} Icon={ Document } />
          <Box>
            <Typography 
                component="span" variant="body1"
                dangerouslySetInnerHTML={{ __html: data.descripcion_html }} 
            />
            <Box 
                sx={[
                    { 
                        paddingTop: '10px', 
                        display: 'flex',
                        justifyContent: 'space-between',
                    },
                    isMobile ? { width: '100%' } : { width: '50%' }
                ]}>
                    <Button onClick={handleAcceder} fullWidth>Acceder</Button>
            </Box>
          </Box>
        </>
    );
}