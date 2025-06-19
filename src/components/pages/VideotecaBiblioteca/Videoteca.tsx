import { TitleScreen } from "@constants";
import { Typography } from "../../atoms/Typography/Typography";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Document } from "../../../assets/icons";
import { Box } from "@mui/material";
import Button from "../../atoms/Button/Button";

export const Videoteca: React.FC = () => {
    return(
        <>
          <TituloIcon Titulo={TitleScreen.VIDEOS_LECTURAS} Icon={ Document } />
          <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column'}}>
            <Typography component="span" variant="body1">
                Una de las más poderosas herramientas del aprendizaje en línea, es el uso de videos como complemento del contenido académico; en ese sentido en Prepa Coppel, ponemos a tu disposición el 100% del material audiovisual producido por la Secretaría de Educación Pública para cada una de tus asignaturas del bachillerato; a través de los cuales podrás vivir la experiencia de un docente a distancia en tus propios tiempos y con la frecuencia que sea necesaria para la total comprensión del contenido educativo.
            </Typography>
            <Typography component="span" variant="body1">
                En nombre de Prepa Coppel y la Secretaría de Educación Pública te invitamos a profundizar en cada uno de los temas y reforzar tus conocimientos con este material audiovisual; el utilizarlo te permitirá:
            </Typography>
            <Typography component="span" variant="body1">
                <Box sx={{ display: 'flex', gap: '5px', flexDirection: 'column', paddingLeft: '10px'}}>
                    <li>Reforzar lo aprendido en cada uno de los bloques de las materias que curses.</li>
                    <li>Adquirir y perfeccionar tus procesos de aprendizaje.</li>
                    <li>Generar una cultura para la reflexión, el análisis y la crítica, con la revisión bibliográfica previa y el enfoque educativo del docente.</li>
                    <li>Crear un sentido de autodeterminación, autodirección y autoestudio.</li>
                    <li>Consultar el video cuantas veces consideres necesario para la consolidación de tu aprendizaje.</li>
                    <li>Resolver problemas del tema de tu elección con una explicación paso a paso.</li>
                </Box>
            </Typography>
            <Typography component="span" variant="body1">
                Te invitamos a visitar este espacio que te ayudará a crecer como autogestor de tu aprendizaje en un ambiente visual y auditivo.
            </Typography>
            <Typography component="span" variant="body1">
                * Para accesar a la Videoteca Virtual, da click en el siguiente botón.
            </Typography>
            <Button onClick={() => {}} fullWidth>Acceder</Button>
          </Box>
        </>
    );
}