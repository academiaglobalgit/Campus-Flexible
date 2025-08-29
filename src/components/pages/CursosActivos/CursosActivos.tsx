import React, { useEffect } from "react";
import { Box, Button, Divider, useMediaQuery, useTheme } from "@mui/material";
import { AppRoutingPaths, TitleScreen, type CursoActivo as ICursoActivo } from "@constants";
import { Accordion } from "../../molecules/Accordion/Accordion";
import { TituloIcon } from "../../molecules/TituloIcon/TituloIcon";
import { Typography } from "../../atoms/Typography/Typography";
import { LinearProgressWithLabel } from "../../molecules/LinearProgress/LinearProgress";
import { CursosActivos } from "@iconsCustomizeds";
import { useNavigate } from "react-router-dom";
import { ContainerDesktop } from "../../organisms/ContainerDesktop/ContainerDesktop";
import { useGetCursos } from "../../../services/CursosActivosService";
import { useGetDatosModulos } from "../../../services/ModulosCampusService";
import { ModulosCampusIds } from "../../../types/modulosCampusIds";
import { LoadingCircular } from "../../molecules/LoadingCircular/LoadingCircular";
import { accordionStyle, innerHTMLStyle } from "@styles";
import { setCursoSelected } from "../../../hooks/useLocalStorage";
import { AccordionStatus } from "../../molecules/AccordionStatus/AccordionStatus";
import { EncuestasModal } from "../../molecules/Dialogs/EncuestasDialog/EncuestasDialog";

const CursoActivo: React.FC = () => {
    const theme = useTheme();
    const { data: cursosData, isLoading } = useGetCursos();
    const { data: cursosDatos } = useGetDatosModulos(ModulosCampusIds.CURSOS_ACTIVOS);
    const [openEncuesta, setOpenEncuesta] = React.useState(false);

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

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navigate = useNavigate();

    useEffect(() => {
        if (cursosData?.data.some(item => item.estatus === "Finalizado")) {
            setOpenEncuesta(true);
        }
    }, [cursosData]);

    const goToInformacion = (item: ICursoActivo) => {
        const curso = {
            id_curso: item.id_curso,
            titulo: item.titulo_curso,
            estatus: item.estatus
        };

        setCursoSelected(JSON.stringify(curso));
        navigate(AppRoutingPaths.CURSOS_ACTIVOS_DETALLES.replace(":id", `${item.id_curso}`));
    }

    const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
        <Box sx={{ display: 'flex' }}>
            <Typography component="span" variant="body2" sxProps={{ fontWeight: 'bold' }}>
                {label}
            </Typography>
            <Typography component="span" variant="body2" sxProps={{ color: theme.palette.grey[100], ml: 1 }}>
                {value}
            </Typography>
        </Box>
    );

    const BoxInfoRow = (children: React.ReactNode) => (
        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>{children}</Box>
    );

    const materiaItem = (item: ICursoActivo, index: number) => {
        return (
            <Accordion
                key={index}
                sxProps={accordionStyle}
                title={item.titulo_curso}
                customHeader={<AccordionStatus tittle={item.titulo_curso} status={item.estatus} sxProps={{ flexDirection: isMobile ? 'column' : 'row' }} />}
            >

                <Box sx={{ display: 'flex', width: '100%', flexFlow: 'column wrap' }}>

                    <Box sx={isMobile ? { display: 'flex', flexWrap: 'wrap', width: '100%', paddingInline: 'clamp(0rem, 5vw, 2rem)', gap: '1rem', } : { display: 'flex', flexWrap: 'wrap', width: '100%', paddingInline: 'clamp(0rem, 5vw, 2rem)', gap: '1rem', justifyContent: 'space-between' }}>
                        {
                            BoxInfoRow(
                                <>
                                    <InfoRow label="Inicio:" value={item.fecha_inicio} />
                                    <InfoRow label="Fin:" value={item.fecha_fin} />
                                </>
                            )
                        }
                        {
                            BoxInfoRow(
                                <>
                                    <InfoRow label="Tutor Asignado:" value={item.nombre_tutor} />
                                    <InfoRow label="Correo:" value={item.correo} />
                                </>
                            )
                        }
                    </Box>

                    <Typography component="span" variant="h5" sxProps={{ color: theme.palette.primary.main, marginTop: '44px', paddingInline: 'clamp(0rem, 5vw, 2rem)' }}>
                        Tu Progreso
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>

                        <Box sx={isMobile ? { width: '100%', maxWidth: '320px' } : { display: 'flex', flexDirection: 'column', gap: '24px', width: '50%' }}>
                            <Box sx={{ padding: '5px 0 5px 0' }}>
                                <LinearProgressWithLabel
                                    value={item.progreso}
                                    barColor={item.progreso == 100 ? '#2e7d32' : '#D9A514'}
                                    trackColor="#AAB1B6"
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '320px' }}>
                            <Button onClick={() => goToInformacion(item)} fullWidth variant="contained">Ir al Curso</Button>
                        </Box>

                    </Box>
                </Box>

            </Accordion>
        )
    };

    const Materias = (
        <>
            <Divider textAlign="center">
                <Typography component="span" variant="body2" color="primary">Materias</Typography>
            </Divider>
            {
                isLoading
                    ?
                    <LoadingCircular Text="Cargando Cursos Activos..." />
                    :
                    cursosData?.data.map((item, index) => (
                        materiaItem(item, index)

                    ))
            }
        </>
    );

    return (
        <>
            {isMobile
                ?
                <>
                    <TituloIcon Titulo={TitleScreen.CURSOS_ACTIVOS} Icon={CursosActivos} />
                    <Box sx={{ ...innerHTMLStyle }} dangerouslySetInnerHTML={{ __html: cursosDatos?.data?.descripcion_html ?? '' }} />
                    {Materias}
                </>
                :
                <ContainerDesktop title={TitleScreen.CURSOS_ACTIVOS} description={cursosDatos?.data?.descripcion_html ?? ''}>
                    {Materias}
                </ContainerDesktop>
            }

            <EncuestasModal isOpen={openEncuesta} data={encuestaData} close={() => setOpenEncuesta(false)} />

        </>
    );
};

export default CursoActivo;
