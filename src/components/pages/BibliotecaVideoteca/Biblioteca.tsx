import { TitleScreen, type BibliotecaVideoteca } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Box } from "@mui/material";
import Button from "../../atoms/Button/Button";
import { innerHTMLStyle } from "@styles";

type BibliotecaProps = {
    data: BibliotecaVideoteca;
}

export const Biblioteca: React.FC<BibliotecaProps> = ({ data }) => {

    const handleOpenRedalyc = () => {
        window.open("https://www.redalyc.org", '_blank');
    };

    return (
        <>
            <TituloIcon Titulo={TitleScreen.BIBLIOTECA_VIRTUAL} fontSize="h2" />
            <Box>
                <Box sx={{ ...innerHTMLStyle }} dangerouslySetInnerHTML={{ __html: data.descripcion_html }} />
                <Box sx={{ paddingTop: '10px', display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
                    <>
                        <Button onClick={handleOpenRedalyc} fullWidth>Acceder</Button>
                    </>
                </Box>
            </Box>
        </>
    );
}