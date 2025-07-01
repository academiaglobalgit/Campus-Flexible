import { DescripcionesPantallas, TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Calendario as IconCalendario } from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import pdfClendario from "../../../assets/calendario.pdf";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";

const Calendario: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const PDFSection = (
      <Box sx={{ paddingTop: '32px', paddingBottom: '32px', height: '100vh', overflow: 'hidden' }}>
        <iframe
          src={pdfClendario}
          style={{
            width: "100%",
            height: "100vh",
            border: "none",
          }}
          title="PDF Viewer"
        />
      </Box>
    );

    return(
      isMobile 
      ?
        <>
          <TituloIcon Titulo={TitleScreen.CALENDARIO} Icon={ IconCalendario } />
          <Typography component="span" variant="body1">
            {DescripcionesPantallas.CALENDARIO}
          </Typography>
          { PDFSection }
        </>
      :
        <ContainerDesktop title={TitleScreen.CALENDARIO} description={DescripcionesPantallas.CALENDARIO}>
          { PDFSection }
        </ContainerDesktop>
    );
};

export default Calendario;