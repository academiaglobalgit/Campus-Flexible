import { TitleScreen } from "@constants";
import { Typography } from "../../atoms/Typography/Typography";
import { CheckBoxLabel } from "../../atoms/Checkbox/Checkbox";
import { Box, Button, useTheme } from "@mui/material";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";


const TerminosCondiciones: React.FC = () => {
    const theme = useTheme();    

    const textos = () =>(
        <>
            <p>Bienvenido(a) al campus, te deseamos mucho éxito en tus estudios.</p>
            <p>Antes de iniciar las actividades de tus cursos, deberás seguir dos sencillos pasos:</p>            
            <p>1. Leer y aceptar de conformidad los Lineamientos Internos y Normas de Control Escolar, el cual puedes leer haciendo clic aquí.</p>            
            <p>2. Comprometerse a asumir los costos por los conceptos de estudio que se generen, realizando los depósitos en las cuentas bancarias autorizadas. Consulta los precios aquí.</p>            
            <p>Para conocer los tipos de becas y formas de pago que te proporciona tu empresa te sugerimos acercarte a tu RH.</p>            
            <p>3. En caso de haberte inscrito al programa con documentación electrónica, leer y aceptar de conformidad los Términos y Condiciones de entrega de documentación física original, las cuales puedes leer haciendo clic aquí.</p>            
            <p>4. Para garantizar que cumplimos con las nuevas normas de privacidad y datos, nos gustaría asegurarnos de que estés conforme de recibir actualizaciones por correo electrónico de Academia Global. Nuestro Aviso de Privacidad, mismo que puede ser encontrado aquí.</p>
        </>
    );

    const contenido = (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography component="span" variant="h4">
                Estimado(a) alumno(a):
            </Typography>
            <Typography component="div" variant="body2">
                { textos() }
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
        </Box>
    );

    return (

        <ContainerDesktop
            title={TitleScreen.TERMINOS_CONDICIONES}
            children={contenido}
        >
        </ContainerDesktop>

    );
};

export default TerminosCondiciones;