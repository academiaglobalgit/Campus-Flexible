import { TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Calendario as IconCalendario } from "@iconsCustomizeds";
import { Typography } from "../../atoms/Typography/Typography";
import { Box } from "@mui/material";

const Calendario: React.FC = () => {

    const renderCalendarioItem = (text1: string, text2: string) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap:'2px'}}>
            <Typography component="h4" variant="h4" color="primary">
                {text1}
            </Typography>
            <Typography component="span" variant="body1">
                {text2}
            </Typography>
        </Box>
    );

    return(
        <>
          <TituloIcon Titulo={TitleScreen.CALENDARIO} Icon={ IconCalendario } />
          <Typography component="span" variant="body1">
            El calendario contiene las actividades académicas programadas durante el año vigente, tales como fechas de inicio y fin de cada cuatrimestre, las fechas de inicio de cada curso, así como los periodos de recuperación.
          </Typography>
          <Box sx={{ paddingTop: '32px', paddingBottom: '32px', height: 'calc(100vh - 300px)' }}>
            <Typography component="h4" variant="h4">
                AQUI SE MOSTRARA EL PDF
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap:'20px'}}>
            {renderCalendarioItem("Inicio de curso:", "1ro de cada mes")}
            {renderCalendarioItem("Entrega de documentos para inscripción de programa:", "25 y 26 de cada mes")}
          </Box>
        </>
    );
};

export default Calendario;