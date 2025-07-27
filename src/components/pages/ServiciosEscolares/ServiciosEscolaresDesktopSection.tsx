import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardMedia, Grid, MobileStepper, useTheme } from "@mui/material";
import type { Servicios } from "../../../types/ServiciosEscolares.interface";
import { Typography } from "../../atoms/Typography/Typography";
import { CardDuracion } from "../../molecules/CardDuracion/CardDuracion";
import { flexRows } from "@styles";
import { AppRoutingPaths } from "@constants";

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

type ServiciosEscolaresDesktopProps = {
    servicios: Servicios[];
}

export const ServiciosEscolaresDesktopSection: React.FC<ServiciosEscolaresDesktopProps> = ({servicios}) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = servicios.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handlePagar = () => {
        // navigate('/servicios-escolares/pagar');
        window.open('https://academiaglobal.mx/servicios-escolares/pagar', '_blank');
    };

    const handleInformacion = () => {
        navigate(AppRoutingPaths.CONTACTO);
    };

    const ServicioSection = (index: number) => (
        <Grid container spacing={2}>
            <Grid size={{md: 4 }}>
                <Card sx={{ borderRadius: '5px' }}>
                    <CardMedia
                        component="img"
                        height={ 418 }
                        image={ servicios[index].imagen }
                    />
                </Card>
            </Grid>
            <Grid size={{md: 8 }}>
                <Box sx={{ display: 'flex', flexDirection:'column', gap: '30px' }}>
                    <Typography 
                        component="span" 
                        variant="body2"
                    >                                    
                        { servicios[index].descripcion }
                    </Typography>
                    <CardDuracion label="Costo" description={`$${servicios[index].precio} MNX`} />
                    <Box sx={[
                            { width: '100%', gap: '10px', pt: 5 },
                            {...flexRows, flexDirection: 'row-reverse' },
                        ]}>
                        <>
                            <Button
                                onClick={handlePagar}
                                fullWidth
                                variant="contained"
                            >
                                Pagar Aquí
                            </Button>
                        </>
                        <>
                            <Button onClick={handleInformacion} fullWidth variant="outlined" >Más Información</Button>
                        </>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )

    const StepperSection = () => (
        <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
                <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                >
                    Siguiente
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                    ) : (
                    <KeyboardArrowLeft />
                    )}
                    Atras
                </Button>
            }
        />
    );

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {ServicioSection(activeStep)}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ maxWidth: 400, flexGrow: 1, pt: 3 }}>
                    {StepperSection()}
                </Box>    
            </Box>
        </Box>
    );
}