import { DescripcionesPantallas, TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Calendario as IconCalendario } from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { useGetManuales } from "../../../services/ManualesService";

const Calendario: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { data: calendario, isLoading } = useGetManuales('Calendario', 'alumnos');

    const PDFSection = (
      
      isLoading
      ?
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', height: '50vh', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
          <Typography component="h4" variant="h4" color="primary">
            Cargando calendario...
          </Typography>
        </Box>
      :
      <Box sx={{ paddingTop: '32px', paddingBottom: '32px', height: '100vh', overflow: 'hidden' }}>        
        <iframe
          src={calendario?.url}
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