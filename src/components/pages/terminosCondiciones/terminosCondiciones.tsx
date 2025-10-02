import React from "react";
import { AppRoutingPaths, TitleScreen } from "@constants";
import { Typography } from "../../atoms/Typography/Typography";
import { Box, Container, FormControlLabel, FormGroup, Switch, useMediaQuery, useTheme } from "@mui/material";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { terminosSchema, terminosSchemaDiplomados, type TerminosFormData, type TerminosFormDataDiplomados, } from "../../../schemas/terminosCondicionesSchema"; import { useMutation } from "@tanstack/react-query";
import { useTerminos, useGetTerminosDatos } from "../../../services/TerminosCondicionesService";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../providers/NotificationProvider";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Terminos } from "@iconsCustomizeds";
import Button from "../../atoms/Button/Button";
import { innerHTMLStyle } from "@styles";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { useAuth } from "../../../context/AuthContext";

const TerminosCondiciones: React.FC = () => {
    const { setAceptoTerminos, configPlataforma: config } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();
    const { showNotification } = useNotification()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isSending, setIsLoading] = React.useState(false);
    const { data: TyCDatos, isLoading } = useGetTerminosDatos();

    const schema =
        config?.id_plan_estudio === 17 ? terminosSchemaDiplomados : terminosSchema;

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<TerminosFormData | TerminosFormDataDiplomados>({
        resolver: zodResolver(schema),
        defaultValues: {
            aceptoLineamientos: false,
        },
    });

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            await createMutation.mutateAsync({ documentos_legales: [1, 2, 3] });
            if (setAceptoTerminos) setAceptoTerminos(true);
            goToPage();
        } catch (error) {
            showNotification("Hubo un error al registrar: " + error, "error");
            setIsLoading(false);
            console.error(error);
        }
    }

    const goToPage = () => {
        switch (config?.id_plan_estudio) {
            case 17:
                navigate(AppRoutingPaths.CURSOS_ACTIVOS);
                break;
            default:
                navigate(AppRoutingPaths.PLAN_ESTUDIOS);
                break;
        }
    }

    const createMutation = useMutation({
        mutationFn: useTerminos,
    });

    const textos = () => (
        <Box sx={{ ...innerHTMLStyle, pl: 0, pr: 0 }} dangerouslySetInnerHTML={{ __html: TyCDatos?.data?.contenido_html ?? '' }} />

    );

    const contenido = (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <Typography component="div" variant="body2">
                {textos()}
            </Typography>

            <FormGroup sx={{ gap: isMobile ? '32px' : '20px' }}>

                <Controller
                    name="aceptoTerminos"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Switch {...field} checked={field.value} />}
                            label="Acepto los Términos y Condiciones del Servicio y confirmo que he revisado la Política de Privacidad y demás normativas aplicables."
                        />
                    )}
                />

            </FormGroup>
            <Box sx={{ width: isMobile ? '100%' : '178px' }}>
                <Button
                    fullWidth
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    sxProps={{ padding: '8px 22px' }}
                    disabled={!isValid}
                    isLoading={isSending}
                >Aceptar
                </Button>
            </Box>
        </Box>
    );

    return (

        isLoading
            ?
            <LoadingCircular Text="Cargando Términos y Condiciones..." />
            :
            !isMobile
                ?
                <Container fixed sx={{ pl: { xs: 0, sm: "50px" } }}>
                    <ContainerDesktop title={TitleScreen.TERMINOS_CONDICIONES}>
                        {contenido}
                    </ContainerDesktop>
                </Container>
                :
                <>
                    <Container maxWidth='xs' sx={{ pt: 7, pb: 7 }} >
                        <TituloIcon Titulo={TitleScreen.TERMINOS_CONDICIONES} Icon={Terminos} />
                        {contenido}
                    </Container>
                </>
    );
};

export default TerminosCondiciones;