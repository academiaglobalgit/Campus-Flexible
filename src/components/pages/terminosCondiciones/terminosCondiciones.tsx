import { TitleScreen } from "@constants";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { CheckBoxLabel } from "../../atoms/Checkbox/Checkbox";
import { Box, Button } from "@mui/material";
import theme from "../../../theme";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";

const TerminosCondiciones: React.FC = () => {

    return (

        <ContainerDesktop
            title={TitleScreen.TERMINOS_CONDICIONES}
        >
            <TituloIcon Titulo={TitleScreen.TERMINOS_CONDICIONES} Icon={''} fontSize="h2" />
            <Typography component="span" variant="h4">
                Estimado(a) alumno(a):
            </Typography>
            <Typography component="p" variant="body2">
                Bienvenido(a) al campus, te deseamos mucho éxito en tus estudios.
            </Typography>
            <Typography component="p" variant="body2">
                Antes de iniciar las actividades de tus cursos, deberás seguir dos sencillos pasos:
            </Typography>
            <Typography component="p" variant="body2">
                1. Leer y aceptar de conformidad los Lineamientos Internos y Normas de Control Escolar, el cual puedes leer haciendo clic aquí.
            </Typography>
            <Typography component="p" variant="body2">
                2. Comprometerse a asumir los costos por los conceptos de estudio que se generen, realizando los depósitos en las cuentas bancarias autorizadas. Consulta los precios aquí.
            </Typography>

            <Typography component="p" variant="body2">
                Para conocer los tipos de becas y formas de pago que te proporciona tu empresa te sugerimos acercarte a tu RH.
            </Typography>
            <Typography component="p" variant="body2">
                3. En caso de haberte inscrito al programa con documentación electrónica, leer y aceptar de conformidad los Términos y Condiciones de entrega de documentación física original, las cuales puedes leer haciendo clic aquí.
            </Typography>
            <Typography component="p" variant="body2">
                4. Para garantizar que cumplimos con las nuevas normas de privacidad y datos, nos gustaría asegurarnos de que estés conforme de recibir actualizaciones por correo electrónico de Academia Global. Nuestro Aviso de Privacidad, mismo que puede ser encontrado aquí.
            </Typography>

            <Typography component="p" variant="body3" sxProps={{ color: theme.palette.primary.main }}>
                ¡Felicidades!, has dado un gran paso en tu desarrollo profesional y personal.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CheckBoxLabel
                    text="Acepto que he leído los Lineamientos Internos y Normas de Control Escolar"
                    place="end"
                />
                <CheckBoxLabel
                    text="He leído y acepto los Términos y Condiciones de entrega de documentación física original."
                    place="end"
                />
                <CheckBoxLabel
                    text="He leído y acepto el Aviso de Privacidad de Academia Global."
                    place="end"
                />
            </Box>
            <Button
                onClick={() => { }}
                variant="contained"
                sx={{ width: 'fit-content', padding: '8px 22px' }}
            >Aceptar
            </Button>
        </ContainerDesktop>

    );
};

export default TerminosCondiciones;