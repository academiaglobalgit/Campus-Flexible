import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import type { Encuesta } from "../../../../types/Encuestas.interface";
import { stylesEvaluaciones } from "@styles";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type EncuestaDialogProps = {
    isOpen?: boolean;
    data?: Encuesta;
    close: () => void;
}

export const EncuestasModal: React.FC<EncuestaDialogProps> = ({ isOpen, data: _data, close }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = React.useState(false);

    const encuestaData = {
        id_encuesta: 1,
        tipo_encuesta: 1,
        titulo: "HERRAMIENTA DE SATISFACCIÓN DE LOS ESTUDIANTES (FEEDBACK)",
        descripcion: "<p> Objetivo: Este instrumento que busca medir tu nivel de satisfacción en el programa de estudios, nos permitirá recabar información valiosa de las asignaturas que has cursado y guiará la toma de decisiones efectivas, para la mejora continua de tu experiencia académica. <br> <br> Estimado(a) alumno(a), te invitamos a registrar tu impresión según el nivel de satisfacción que has experimentado en cada una de los aspectos que se mencionan, considera que 1 estrella representa el nivel mínimo de satisfacción y 10 estrellas representa el nivel máximo. </p>",
        contenido: `<div id="panel_section_1" class="panel panel-default">
					<div class="panel-body">
						<center> <h4> <span class="pasos"> 1 / 3 </span> </h4> </center><br> <center><strong style="font-size:1rem; color: var(--secondary-color);">Contenido de estudio:</strong></center>
					</div>
					<div class="panel-body">
						
			<div class="row"> 
				<div id="example" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-justify"> 
					
			<p>
				</p><div class="bs-acentuacion text-left circularbook" style="border-left-color: #6B173C;">
					<h4 style="margin-bottom:0px; margin-top: 0px; color: #1A213E;"> <strong> 1.	El material de estudio es claro, incluye suficientes ejemplos y facilita el proceso de tu aprendizaje. </strong> </h4> 
				</div>
			<p></p>
		<p>
			</p><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding:0"> 
				<form name="form_51781_1">
					<span class="evaluacion__clasificacion">
						<input id="estrella_51781_10" type="radio" class="evaluacion__estrellas" name="estrella_51781" value="10" data-respuesta="120880" data-idpregunta="51781" data-orden="1">
						<label class="evaluacion__star" for="estrella_51781_10">★</label>
						<input id="estrella_51781_9" type="radio" class="evaluacion__estrellas" name="estrella_51781" value="9" data-respuesta="120880" data-idpregunta="51781" data-orden="1">
						<label class="evaluacion__star" for="estrella_51781_9">★</label>
						<input id="estrella_51781_8" type="radio" class="evaluacion__estrellas" name="estrella_51781" value="8" data-respuesta="120880" data-idpregunta="51781" data-orden="1">
						<label class="evaluacion__star" for="estrella_51781_8">★</label>
						<input id="estrella_51781_7" type="radio" class="evaluacion__estrellas" name="estrella_51781" value="7" data-respuesta="120880" data-idpregunta="51781" data-orden="1">
						<label class="evaluacion__star" for="estrella_51781_7">★</label>
						<input id="estrella_51781_6" type="radio" class="evaluacion__estrellas" name="estrella_51781" value="6" data-respuesta="120880" data-idpregunta="51781" data-orden="1">
						<label class="evaluacion__star" for="estrella_51781_6">★</label>
						<input id="estrella_51781_5" type="radio" class="evaluacion__estrellas" name="estrella_51781" value="5" data-respuesta="120880" data-idpregunta="51781" data-orden="1">
						<label class="evaluacion__star" for="estrella_51781_5">★</label>
						<input id="estrella_51781_4" type="radio" class="evaluacion__estrellas" name="estrella_51781" value="4" data-respuesta="120880" data-idpregunta="51781" data-orden="1">
						<label class="evaluacion__star" for="estrella_51781_4">★</label>
						<input id="estrella_51781_3" type="radio" class="evaluacion__estrellas" name="estrella_51781" value="3" data-respuesta="120880" data-idpregunta="51781" data-orden="1">
						<label class="evaluacion__star" for="estrella_51781_3">★</label>
						<input id="estrella_51781_2" type="radio" class="evaluacion__estrellas" name="estrella_51781" value="2" data-respuesta="120880" data-idpregunta="51781" data-orden="1">
						<label class="evaluacion__star" for="estrella_51781_2">★</label>
						<input id="estrella_51781_1" type="radio" class="evaluacion__estrellas" name="estrella_51781" value="1" data-respuesta="120880" data-idpregunta="51781" data-orden="1">
						<label class="evaluacion__star" for="estrella_51781_1">★</label>
					</span>
				</form> 				
			</div> 
		<p></p> 
				</div> 
			</div>
		
			<div class="row"> 
				<div id="example" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-justify"> 
					
			<p>
				</p><div class="bs-acentuacion text-left circularbook" style="border-left-color: #6B173C;">
					<h4 style="margin-bottom:0px; margin-top: 0px; color: #1A213E;"> <strong> 2.	La información es aplicable a tu vida profesional. </strong> </h4> 
				</div>
			<p></p>
		<p>
			</p><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding:0"> 
				<form name="form_51782_1">
					<span class="evaluacion__clasificacion">
						<input id="estrella_51782_10" type="radio" class="evaluacion__estrellas" name="estrella_51782" value="10" data-respuesta="120881" data-idpregunta="51782" data-orden="1">
						<label class="evaluacion__star" for="estrella_51782_10">★</label>
						<input id="estrella_51782_9" type="radio" class="evaluacion__estrellas" name="estrella_51782" value="9" data-respuesta="120881" data-idpregunta="51782" data-orden="1">
						<label class="evaluacion__star" for="estrella_51782_9">★</label>
						<input id="estrella_51782_8" type="radio" class="evaluacion__estrellas" name="estrella_51782" value="8" data-respuesta="120881" data-idpregunta="51782" data-orden="1">
						<label class="evaluacion__star" for="estrella_51782_8">★</label>
						<input id="estrella_51782_7" type="radio" class="evaluacion__estrellas" name="estrella_51782" value="7" data-respuesta="120881" data-idpregunta="51782" data-orden="1">
						<label class="evaluacion__star" for="estrella_51782_7">★</label>
						<input id="estrella_51782_6" type="radio" class="evaluacion__estrellas" name="estrella_51782" value="6" data-respuesta="120881" data-idpregunta="51782" data-orden="1">
						<label class="evaluacion__star" for="estrella_51782_6">★</label>
						<input id="estrella_51782_5" type="radio" class="evaluacion__estrellas" name="estrella_51782" value="5" data-respuesta="120881" data-idpregunta="51782" data-orden="1">
						<label class="evaluacion__star" for="estrella_51782_5">★</label>
						<input id="estrella_51782_4" type="radio" class="evaluacion__estrellas" name="estrella_51782" value="4" data-respuesta="120881" data-idpregunta="51782" data-orden="1">
						<label class="evaluacion__star" for="estrella_51782_4">★</label>
						<input id="estrella_51782_3" type="radio" class="evaluacion__estrellas" name="estrella_51782" value="3" data-respuesta="120881" data-idpregunta="51782" data-orden="1">
						<label class="evaluacion__star" for="estrella_51782_3">★</label>
						<input id="estrella_51782_2" type="radio" class="evaluacion__estrellas" name="estrella_51782" value="2" data-respuesta="120881" data-idpregunta="51782" data-orden="1">
						<label class="evaluacion__star" for="estrella_51782_2">★</label>
						<input id="estrella_51782_1" type="radio" class="evaluacion__estrellas" name="estrella_51782" value="1" data-respuesta="120881" data-idpregunta="51782" data-orden="1">
						<label class="evaluacion__star" for="estrella_51782_1">★</label>
					</span>
				</form> 				
			</div> 
		<p></p> 
				</div> 
			</div>
		
			<div class="row"> 
				<div id="example" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-justify"> 
					
			<p>
				</p><div class="bs-acentuacion text-left circularbook" style="border-left-color: #6B173C;">
					<h4 style="margin-bottom:0px; margin-top: 0px; color: #1A213E;"> <strong> 3.	El material del curso te comunica adecuadamente la información, te motiva a que te involucres más con el contenido y mantiene tu atención. </strong> </h4> 
				</div>
			<p></p>
		<p>
			</p><div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding:0"> 
				<form name="form_51783_1">
					<span class="evaluacion__clasificacion">
						<input id="estrella_51783_10" type="radio" class="evaluacion__estrellas" name="estrella_51783" value="10" data-respuesta="120882" data-idpregunta="51783" data-orden="1">
						<label class="evaluacion__star" for="estrella_51783_10">★</label>
						<input id="estrella_51783_9" type="radio" class="evaluacion__estrellas" name="estrella_51783" value="9" data-respuesta="120882" data-idpregunta="51783" data-orden="1">
						<label class="evaluacion__star" for="estrella_51783_9">★</label>
						<input id="estrella_51783_8" type="radio" class="evaluacion__estrellas" name="estrella_51783" value="8" data-respuesta="120882" data-idpregunta="51783" data-orden="1">
						<label class="evaluacion__star" for="estrella_51783_8">★</label>
						<input id="estrella_51783_7" type="radio" class="evaluacion__estrellas" name="estrella_51783" value="7" data-respuesta="120882" data-idpregunta="51783" data-orden="1">
						<label class="evaluacion__star" for="estrella_51783_7">★</label>
						<input id="estrella_51783_6" type="radio" class="evaluacion__estrellas" name="estrella_51783" value="6" data-respuesta="120882" data-idpregunta="51783" data-orden="1">
						<label class="evaluacion__star" for="estrella_51783_6">★</label>
						<input id="estrella_51783_5" type="radio" class="evaluacion__estrellas" name="estrella_51783" value="5" data-respuesta="120882" data-idpregunta="51783" data-orden="1">
						<label class="evaluacion__star" for="estrella_51783_5">★</label>
						<input id="estrella_51783_4" type="radio" class="evaluacion__estrellas" name="estrella_51783" value="4" data-respuesta="120882" data-idpregunta="51783" data-orden="1">
						<label class="evaluacion__star" for="estrella_51783_4">★</label>
						<input id="estrella_51783_3" type="radio" class="evaluacion__estrellas" name="estrella_51783" value="3" data-respuesta="120882" data-idpregunta="51783" data-orden="1">
						<label class="evaluacion__star" for="estrella_51783_3">★</label>
						<input id="estrella_51783_2" type="radio" class="evaluacion__estrellas" name="estrella_51783" value="2" data-respuesta="120882" data-idpregunta="51783" data-orden="1">
						<label class="evaluacion__star" for="estrella_51783_2">★</label>
						<input id="estrella_51783_1" type="radio" class="evaluacion__estrellas" name="estrella_51783" value="1" data-respuesta="120882" data-idpregunta="51783" data-orden="1">
						<label class="evaluacion__star" for="estrella_51783_1">★</label>
					</span>
				</form> 				
			</div> 
		<p></p> 
				</div> 
			</div>
		
					</div>
				</div>`
    }

    useEffect(() => {
        setOpen(isOpen ?? false);
    }, [isOpen]);

    const handleClose = () => {
        setOpen(false);
        close();
    };

    const siguiente = (
        <Button
            fullWidth
            onClick={handleClose}
            iconPosition={'end'}
            icon={<ArrowForwardIcon />}
        >
            Siguiente
        </Button>
    );
    const anterior = (
        <Button
            fullWidth
            variant="outlined"
            iconPosition={'start'}
            icon={<ArrowBackIcon />}
            onClick={handleClose}
        >
            Anterior
        </Button>
    );

    return (
        <Dialog isOpen={open} sxProps={{ margin: '5px', ...(isMobile ? { width: '100%' } : {}) }} >
            <Box sx={[
                { display: 'flex', flexDirection: 'column' },
                isMobile ? { padding: '15px' } : { padding: '30px' },
                !isMobile && { width: '700px' }
            ]}>
                <Divider sx={{
                    '& .MuiDivider-wrapper': {
                        borderRadius: '50px',
                        padding: '5px 10px 5px 10px',
                    },
                }}
                >
                    <Typography component="span" variant="body2" color="primary">{encuestaData?.titulo}</Typography>
                </Divider>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px', paddingBottom: '16px', height: '60vh', overflowY: 'scroll', pr: 2, mb: 2 }}>
                    <Typography
                        variant="body2"
                        component="p"
                        dangerouslySetInnerHTML={{ __html: encuestaData?.descripcion ?? '' }}
                        sx={{ textAlign: "justify" }}
                    />
                    <Typography
                        variant="body2"
                        component="p"
                        dangerouslySetInnerHTML={{ __html: encuestaData?.contenido ?? '' }}
                        sx={{ ...stylesEvaluaciones, border: 'solid 1px #acacacff', borderRadius: '10px', p: 2, backgroundColor: '#f1f1f1ff !important' }}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 4 }}>
                    {anterior}
                    {siguiente}
                </Box>
                <Box sx={{ paddingTop: '10px' }}></Box>
            </Box>
        </Dialog >
    );
}