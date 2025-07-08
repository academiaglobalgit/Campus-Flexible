import { TitleScreen, type BibliotecaVideoteca } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Document } from "../../../assets/icons";
import { Box, Typography } from "@mui/material";
import Button from "../../atoms/Button/Button";

type BibliotecaProps = {
    data: BibliotecaVideoteca;
}

export const Biblioteca: React.FC<BibliotecaProps> = ({data}) => {
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
                    <Button onClick={() => {}} fullWidth>Acceder</Button>
                </>
                <>
                    <Button onClick={() => {}} fullWidth variant="outlined">Manual de Biblioteca</Button>
                </>
            </Box>
          </Box>
        </>
    );
}