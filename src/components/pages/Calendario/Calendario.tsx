import { TipoManualesIds, TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Calendario as IconCalendario } from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { useGetDatosModulos } from "../../../services/ModulosCampusService";
import { ModulosCampusIds } from "../../../types/modulosCampusIds";
import { innerHTMLStyle } from "@styles";
import { useDocumentos } from "../../../context/DocumentosContext";

const Calendario: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { documentos } = useDocumentos();
  const { data: CalendarioDatos, isLoading } = useGetDatosModulos(ModulosCampusIds.CALENDARIO);

console.log(documentos.find(doc => doc.id_tipo_manual === TipoManualesIds.CALENDARIO)?.url_archivo);
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
          src={documentos.find(doc => doc.id_tipo_manual === TipoManualesIds.CALENDARIO)?.url_archivo || ''}
          style={{
            width: "100%",
            height: "100vh",
            border: "none",
          }}
          title="PDF Viewer"
        />
      </Box>
  );

  return (
    isMobile
      ?
      <>
        <TituloIcon Titulo={TitleScreen.CALENDARIO} Icon={IconCalendario} />
        <Box sx={{ ...innerHTMLStyle, pl: 0, pr: 0 }} dangerouslySetInnerHTML={{ __html: CalendarioDatos?.data?.descripcion_html ?? '' }} />
        {PDFSection}
      </>
      :
      <ContainerDesktop title={TitleScreen.CALENDARIO} description={CalendarioDatos?.data?.descripcion_html ?? ''}>
        {PDFSection}
      </ContainerDesktop>
  );
};

export default Calendario;