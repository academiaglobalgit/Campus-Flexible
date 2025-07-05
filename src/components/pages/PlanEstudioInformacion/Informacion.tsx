import { Box } from "@mui/material";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { flexRows, flexColumn } from "@styles";

export const CardDuracion = ({ label, description, sxProps }: { label: string; description: string; sxProps: any }) => {
    return (
        <Box sx={{
                ...flexRows,
                ...sxProps,
                backgroundColor: "#F8F8F9", 
                gap: "10px",
                boxShadow: "0px 2px 4px 0px #6BBBE44D", 
                border: "1px solid #BABABA0D",
                height: "57px",
                borderRadius: "3px",
        }}>
            <Typography component="span" variant="body3">{label}</Typography>
            <Typography component="span" variant="h4" color="primary">{description}</Typography>
        </Box>
    )
};

export const Informacion: React.FC = () => {

    const duracion = [
        {label: "Logitud:", description: "50 Horas"},
        {label: "Nivel:", description: "Medio"},
        {label: "Idioma:", description: "Español"},
    ];

    return(
        <Box>
            <TituloIcon Titulo="Seguridad informática I" fontSize="h4" />
            <Box sx={{ display: "flex", flexDirection:"column", gap: "15px", pb: "30px" }}>                
                {
                    duracion.map((item, index) => (
                        <CardDuracion key={index} label={item.label} description={item.description} sxProps={undefined}/>
                    ))
                }
            </Box>
            <Box sx={{...flexColumn, alignItems: "flex-start", pb: "30px"}}>
                <Typography component="h4" variant="h4" color="primary">Tipo de información:</Typography>
                <Typography component="span" variant="body1">
                    Con instructor, de auto-inscripción en línea.<br /><br />
                    Es necesario que cuentes con un correo electrónico, si aún no lo tienes, te recomendamos que lo generes lo antes posible, ya que lo utilizarás a lo largo de tu carrera profesional
                </Typography>
            </Box>
            <Box sx={{...flexColumn, alignItems: "flex-start", gap: '10px'}}>
                <Typography component="h4" variant="h4" color="primary">Descripción:</Typography>
                <Typography component="p" variant="body1">
                    Desde términos tan básicos como “contraseña”, “usuario”, hasta términos avanzados como “Sistemas de detección”, cobran sentido en cualquier empresa, y es que hoy por hoy ya no son solo términos deseables de conocer, sino indispensables , pues sin ellos se recae en un estado “débil” y en “peligro”, ante las amenazas que cada día crecen respecto a operaciones no autorizadas con nuestra información.
                </Typography>
                <Typography component="p" variant="body1">
                    Existen un sin fin de medidas que permiten proteger el valor principal de una empresa “la información”, desde controles de acceso, hasta uso de firewall, o un simple mantenimiento.
                </Typography>
                <Typography component="p" variant="body1">
                    Pero para un usuario de un sistema estos términos no son aplicables en su día a día, es por eso que toda empresa que trabaja con datos necesita involucrar herramientas que protejan la experiencia del usuarios al utilizar nuestros servicios.
                </Typography>
                <Typography component="p" variant="body1">
                    Imagina el alcance de conocer las herramientas que permitirán crear confianza al usuario para la interacción con nuestra organización.
                </Typography>
                <Typography component="p" variant="body1">
                    Por tal el impacto de esta materia es tan importante como los datos que se involucran, pues garantizar la seguridad de datos otorga integridad, acceso y confidencialidad al usuario.
                </Typography>
                <Typography component="p" variant="body1">
                    Inscríbete y conoce más sobre cómo generar planes de acciones para las diversas amenazas de los sistemas de información, y cómo consolidar estos cimientos en la aplicación y evaluación de estos planes ante un evento en crisis.
                </Typography>
                <Typography component="p" variant="body1">
                    Se recomienda haber llevado el curso de Aseguramiento de la Calidad o poseer conocimientos equivalentes.
                </Typography>
                <Typography component="p" variant="body1">
                    Aprenderás estas habilidades fundamentales:
                </Typography>
                <Typography component="span" variant="body1">
                    <ul>
                        <li>Identificar amenazas y vulnerabilidades en un Sistema de información</li>
                        <li>Reconocer ataques e intrusión a sistemas</li>
                        <li>Configuración de Router</li>
                        <li>Creación, aplicación y evaluación de planes de acción</li>
                    </ul>
                </Typography>
            </Box>
        </Box>
    );
}