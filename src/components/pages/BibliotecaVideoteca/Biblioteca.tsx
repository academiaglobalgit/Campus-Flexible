import { TitleScreen } from "@constants";
import { Typography } from "../../atoms/Typography/Typography";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Document } from "../../../assets/icons";
import { Box } from "@mui/material";
import Button from "../../atoms/Button/Button";

export const Biblioteca: React.FC = () => {
    return(
        <>
          <TituloIcon Titulo={TitleScreen.BIBLIOTECA_VIRTUAL} Icon={ Document } />
          <Box sx={{ display: 'flex', gap: '20px', flexDirection: 'column'}}>
            <Typography component="span" variant="body1">
                Estamos emocionados de poner a tu disposición la Biblioteca Virtual de la Comisión Nacional de Libros de Textos Gratuitos (CONALITEG), un recurso valioso para tu formación académica. En esta biblioteca, encontrarás una amplia colección de libros que se han desarrollado pensando en las necesidades particulares de cada uno de tus cursos. La Biblioteca de CONALITEG te ofrece una oportunidad única para complementar tus estudios en línea, sus materiales están diseñados específicamente para el nivel de Educación Media Superior, lo que significa que tendrás acceso a contenidos educativos relevantes y de alta calidad, que enriquecerán tu experiencia de aprendizaje.
            </Typography>
            <Typography component="span" variant="body1">
                Mediante la lectura de este material didáctico electrónico obtendrás los siguientes beneficios:
            </Typography>
            <Typography component="span" variant="body1">
                <Box sx={{ display: 'flex', gap: '5px', flexDirection: 'column', paddingLeft: '10px'}}>
                    <ol style={{padding: '0 5px'}}>
                        <li>Al estudiar en línea, la Biblioteca de CONALITEG se convertirá en tu aliado ya que podrás consultar sus libros desde cualquier lugar y en el momento en que lo decidas.</li>
                        <li>Los materiales de CONALITEG te permitirán consolidar tus conocimientos en cada asignatura y mejorar tus procesos de aprendizaje.</li>
                        <li>A través de este Campus, podrás interactuar con una amplia gama de contenidos educativos que te ayudarán al desarrollo de habilidades de reflexión, de análisis y de pensamiento crítico.</li>
                        <li>La Biblioteca de CONALITEG fomenta la autodirección de tus estudios, contribuyendo a fortalecer un sentido de responsabilidad y autodeterminación en tu formación académica.</li>
                    </ol>
                </Box>
            </Typography>
            <Typography component="span" variant="body1">
                <Box sx={{display:'flex', flexDirection: 'column'}}>
                    <span>
                        No dejes pasar la oportunidad de aprovechar este valioso recurso.
                    </span>
                    <span>
                        ¡Accede a la Biblioteca de CONALITEG y abre las puertas a un mundo de conocimiento especialmente diseñado para estudiantes de Preparatoria!
                    </span>
                    <span>
                        ¡Enriquece tu aprendizaje y da un paso más hacia tu éxito académico!
                    </span>
                </Box>
            </Typography>
            <Typography component="span" variant="body1">
                Para acceder a la Biblioteca de CONALITEG, haz clic en el botón de abajo:
            </Typography>
            <Box sx={{ paddingTop: '10px', display: 'flex', gap: '15px', justifyContent: 'space-between' }}>
                <>
                    <Button onClick={() => {}} fullWidth>Acceder</Button>
                </>
                <>
                    <Button onClick={() => {}} fullWidth variant="outlined" >Manual de Biblioteca</Button>
                </>
          </Box>
          </Box>
        </>
    );
}