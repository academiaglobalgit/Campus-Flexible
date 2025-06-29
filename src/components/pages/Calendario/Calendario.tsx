import { TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Calendario as IconCalendario } from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { Box } from "@mui/material";
import pdfClendario from "../../../assets/calendario.pdf";

const Calendario: React.FC = () => {

    return(
        <>
          <TituloIcon Titulo={TitleScreen.CALENDARIO} Icon={ IconCalendario } />
          <Typography component="span" variant="body1">
            El calendario contiene las actividades académicas programadas durante el año vigente, tales como fechas de inicio y fin de cada cuatrimestre, las fechas de inicio de cada curso, así como los periodos de recuperación.
          </Typography>
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
        </>
    );
};

export default Calendario;