import { TitleScreen, type BibliotecaVideoteca } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Document } from "../../../assets/icons";
import { Box, Typography } from "@mui/material";
import Button from "../../atoms/Button/Button";
import { useGetManuales } from "../../../services/ManualesService";

type BibliotecaProps = {
    data: BibliotecaVideoteca;
}

export const Biblioteca: React.FC<BibliotecaProps> = ({data}) => {
    const {data: manual} = useGetManuales('Manual Biblioteca', 'alumnos');

    const handleManualBiblioteca = () => {
        if (manual) {
            const manualUrl = manual.url;
            window.open(manualUrl, '_blank');
        }
    };

    const handleOpenRedalyc = () => {
         window.open("https://www.redalyc.org", '_blank');
    };

    return(
        <>
          <TituloIcon Titulo={TitleScreen.BIBLIOTECA_VIRTUAL} Icon={ Document } />
          <Box>
            <Typography 
                component="span" variant="body1"
                dangerouslySetInnerHTML={{ __html: data.descripcion_html }} 
            />
            <Box sx={{ paddingTop: '10px', display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
                <>
                    <Button onClick={handleOpenRedalyc} fullWidth>Acceder</Button>
                </>
                <>
                    <Button onClick={handleManualBiblioteca} fullWidth variant="outlined">Manual de Biblioteca</Button>
                </>
            </Box>
          </Box>
        </>
    );
}