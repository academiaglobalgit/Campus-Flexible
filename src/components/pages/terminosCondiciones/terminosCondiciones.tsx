import React from "react";
import { AppRoutingPaths, TitleScreen } from "@constants";
import { Typography } from "../../atoms/Typography/Typography";
import { Box, Container, FormControlLabel, FormGroup, Switch, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { terminosSchema, type TerminosFormData } from "../../../schemas/terminosCondicionesSchema";
import { useMutation } from "@tanstack/react-query";
import { useTerminos } from "../../../services/TerminosCondicionesService";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../providers/NotificationProvider";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Terminos } from "@iconsCustomizeds";
import Button from "../../atoms/Button/Button";

const TerminosCondiciones: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { showNotification } = useNotification()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isLoading, setIsLoading] = React.useState(false);
    
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<TerminosFormData>({
        resolver: zodResolver(terminosSchema),
        defaultValues: {
            aceptoTerminos: false,
            aceptoLineamientos: false,
            aceptoAvisos: false,
        },
    });

    const onSubmit = async() => {
        try {
            setIsLoading(true);
            await createMutation.mutateAsync({ documentos_legales: [1,2,3] });
            navigate(AppRoutingPaths.PLAN_ESTUDIOS);
        } catch (error) {
            showNotification("Hubo un error al registrar: " + error, "error");
            setIsLoading(false);
            console.error(error);
        }
    }

    const createMutation = useMutation({
        mutationFn: useTerminos,
    }); 

    const textos = () =>(
        <>
            <p>Bienvenido(a) al campus, te deseamos mucho éxito en tus estudios.</p>
            <p>Antes de iniciar las actividades de tus cursos, deberás seguir dos sencillos pasos:</p>
            <ol>
                <li><p>Leer y aceptar de conformidad los Lineamientos Internos y Normas de Control Escolar, el cual puedes leer haciendo clic aquí.</p></li>
                <li><p>Comprometerse a asumir los costos por los conceptos de estudio que se generen, realizando los depósitos en las cuentas bancarias autorizadas. Consulta los precios aquí.</p></li>
            </ol>
            
            <p>Para conocer los tipos de becas y formas de pago que te proporciona tu empresa te sugerimos acercarte a tu RH.</p>            
            <ol start={3}>
                <li><p>En caso de haberte inscrito al programa con documentación electrónica, leer y aceptar de conformidad los Términos y Condiciones de entrega de documentación física original, las cuales puedes leer haciendo clic aquí.</p></li>
                <li><p>Para garantizar que cumplimos con las nuevas normas de privacidad y datos, nos gustaría asegurarnos de que estés conforme de recibir actualizaciones por correo electrónico de Academia Global. Nuestro Aviso de Privacidad, mismo que puede ser encontrado aquí.</p></li>
            </ol>
        </>
    );

    const contenido = (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Typography component="span" variant="h4">
                Estimado(A) alumno(A):
            </Typography>
            <Typography component="div" variant="body2">
                { textos() }
            </Typography>

            <Typography component="p" variant="h4" sxProps={{ color: theme.palette.primary.main, textAlign: isMobile ? 'center' : 'left' }}>
                ¡Felicidades!
                {isMobile && <br />}
                {' has dado un gran paso en tu desarrollo profesional y personal.'}
            </Typography>
            <FormGroup sx={{gap: isMobile ? '32px' : '20px'}}>                
                <Controller
                    name="aceptoTerminos"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                        control={<Switch {...field} checked={field.value} />}
                        label="Acepto que he leído los Lineamientos Internos y Normas de Control Escolar."
                        />
                    )}
                />

                <Controller
                    name="aceptoLineamientos"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                        control={<Switch {...field} checked={field.value} />}
                        label="He leído y acepto los Términos y Condiciones de entrega de documentación física original."
                        />
                    )}
                />

                <Controller
                    name="aceptoAvisos"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                        control={<Switch {...field} checked={field.value} />}
                        label="He leído y acepto el Aviso de Privacidad de Academia Global."
                        />
                    )}
                />
            </FormGroup>
            <Box sx={{ width: isMobile ? '100%' : '178px'}}>
                    <Button
                        fullWidth
                        onClick={handleSubmit(onSubmit)} 
                        variant="contained"
                        sxProps={{ padding: '8px 22px' }}
                        disabled={!isValid}
                        isLoading={isLoading}
                    >Aceptar
                </Button>
            </Box>
        </Box>
    );

    return (
        !isMobile
        ?
            <Container fixed sx={{ pl: { xs: 0, sm: "50px" } }}>
                <ContainerDesktop title={TitleScreen.TERMINOS_CONDICIONES}>
                    { contenido }
                </ContainerDesktop>
            </Container>
        :
            <>
                <Container maxWidth='xs' sx={{ pt: 7, pb: 7 }} >
                    <TituloIcon Titulo={TitleScreen.TERMINOS_CONDICIONES} Icon={ Terminos } />
                    {contenido}
                </Container>
            </>
    );
};

export default TerminosCondiciones;