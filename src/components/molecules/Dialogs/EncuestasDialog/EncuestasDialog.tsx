import { Box, Divider, TextField, Typography, useMediaQuery, useTheme, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import type { EncuestasDatosResponse, Preguntas } from "../../../../types/Encuestas.interface";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNotification } from "../../../../providers/NotificationProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CURSOS_ACTIVOS_ENDPOINTS } from "../../../../types/endpoints";
import { SaveEncuesta } from "../../../../services/CursosActivosService";
import { innerHTMLStyle } from "@styles";

type EncuestaDialogProps = {
	isOpen?: boolean;
	data?: {
		encuesta: EncuestasDatosResponse;
		idAsignacion: number;
	};
	onEncuestaEnviada?: (enviada: boolean) => void;
};

type Respuesta =
	| { id_pregunta: number; id_opcion: number }
	| { id_pregunta: number; respuesta_texto: string };

export const EncuestasModal: React.FC<EncuestaDialogProps> = ({ isOpen, data, onEncuestaEnviada }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const queryClient = useQueryClient();
	const { showNotification } = useNotification();
	const [open, setOpen] = React.useState(false);
	const [isDisabled, setIsDisabled] = React.useState(true);
	const [isSending, setIsSending] = React.useState(false);
	const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
	const totalPreguntas = data?.encuesta?.preguntas.length;

	useEffect(() => {
		setOpen(isOpen ?? false);
	}, [isOpen]);



	function validarEncuesta(respuesta: Respuesta[]) {
		const totalRespuestas = respuesta.length
		if (totalPreguntas === totalRespuestas) {
			setIsDisabled(false);
		} else {
			setIsDisabled(true);
		}
	}

	const handlSetEncuesta = (respuesta: Respuesta[], idAsignacion: number) => {
		setIsSending(true);
		setIsDisabled(true);
		createMutation.mutate({ respuestas: respuesta, id_asignacion: idAsignacion });
	}

	const createMutation = useMutation({
		mutationFn: SaveEncuesta,
		onSuccess: async () => {

			await queryClient.invalidateQueries({
				queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_MATERIAS.key],
				exact: true,
			});
			await queryClient.invalidateQueries({
				queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_ENCUESTAS_ASIGNACIONES.key],
				exact: true,
			});

			setIsSending(false);
			setOpen(false);
			setIsDisabled(true);
			showNotification(`Encuesta guardada satisfactoriamente`, "success");

			if (onEncuestaEnviada) onEncuestaEnviada(true);
		},
		onError: (error) => {
			console.log(error)
			setIsSending(false);
			setOpen(false);
			showNotification(`Error al registrar: ${error.message}`, "error");
		},
		onSettled: () => {
			console.log('La mutación ha finalizado');
		}
	});

	const siguiente = (
		<Button
			fullWidth
			onClick={() => {
				if (typeof data?.idAsignacion === 'number') {
					handlSetEncuesta(respuestas, data.idAsignacion);
				}
			}}
			iconPosition={'end'}
			isLoading={isSending}
			disabled={isDisabled}
			icon={<ArrowForwardIcon />}
		>
			Enviar
		</Button>
	);

	const handleTextChange = (id_pregunta: number, value: string) => {

		setRespuestas(prev => {
			if (!value.trim()) {
				const nuevas = prev.filter(item => item.id_pregunta !== id_pregunta);
				validarEncuesta(nuevas);
				return nuevas;
			}

			const existe = prev.some(item => item.id_pregunta === id_pregunta);
			const nuevas = existe
				? prev.map(item =>
					item.id_pregunta === id_pregunta
						? { ...item, id_pregunta, respuesta_texto: value }
						: item
				)
				: [...prev, { id_pregunta, respuesta_texto: value }];

			validarEncuesta(nuevas);
			return nuevas;
		});
	};

	const handleRadioChange = (id_pregunta: number) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const id_opcion = Number(event.target.value);

			setRespuestas(prev => {
				const existe = prev.some(r => r.id_pregunta === id_pregunta);
				const nuevas = existe
					? prev.map(r =>
						r.id_pregunta === id_pregunta ? { id_pregunta, id_opcion } : r
					)
					: [...prev, { id_pregunta, id_opcion }];

				validarEncuesta(nuevas);
				return nuevas;
			});
		};

	const Preguntas = (item: Preguntas, index: number) => (
		<React.Fragment key={item.id_pregunta}>
			<Box key={"pregunta" + index} sx={{ display: 'flex', alignItems: 'flex-start', gap: '8px', alignSelf: 'stretch' }}>
				<Box sx={{
					display: "flex",
					width: "24px",
					height: "24px",
					padding: "4px 8px",
					justifyContent: "center",
					alignItems: "center",
					gap: "10px",
					aspectRatio: "1 / 1",
					borderRadius: "30px",
					border: `1px solid var(--Blue-Blue-100, ${theme.palette.primary.main})`,
					background: theme.palette.primary.main,
					color: '#fff'
				}}>
					{item.orden}
				</Box>
				<Typography component="span" variant="body2" color="text" dangerouslySetInnerHTML={{ __html: item.titulo_pregunta ?? '' }}>
				</Typography>
			</Box>

			{item.tipo_pregunta === "escala" && (
				<Box
					key={`preguntas-${item.id_pregunta}`}
					sx={{ display: "flex", flexDirection: "column", gap: 1 }}
				>
					<RadioGroup
						name={`pregunta-${item.id_pregunta}`}
						value={
							(() => {
								const respuesta = respuestas.find(r => r.id_pregunta === item.id_pregunta);
								return respuesta && 'id_opcion' in respuesta ? respuesta.id_opcion : "";
							})()
						}
						onChange={handleRadioChange(item.id_pregunta)}
					>
						{item.opciones.map((opcion) => {
							return (
								<FormControlLabel
									key={opcion.id_opcion}
									value={opcion.id_opcion}
									control={<Radio />}
									label={opcion.etiqueta}
									sx={{
										marginLeft: "10px",
										display: "flex",
										alignItems: "center",
										padding: "10px",
										gap: "8px",
										alignSelf: "stretch",
										borderRadius: "8px",
										border: "1px solid var(--Gray-50, #dcdfe0ff)",
									}}
								/>
							);
						})}
					</RadioGroup>
				</Box>
			)}

			{
				item.tipo_pregunta === "abierta" && (
					<TextField
						fullWidth
						size="small"
						placeholder="Escribe tu respuesta"
						onChange={(e) => handleTextChange(item.id_pregunta, e.target.value)}
						value={
							(() => {
								const itemRespuesta = respuestas.find(r => r.id_pregunta === item.id_pregunta);
								return itemRespuesta && 'respuesta_texto' in itemRespuesta ? itemRespuesta.respuesta_texto : "";
							})()
						}
						sx={{ mt: 1 }}
					/>
				)
			}
		</React.Fragment >
	);


	return (
		<Dialog isOpen={open} sxProps={{ backgroundColor: '#fff', margin: '5px', ...(isMobile ? { width: '100%' } : {}) }} >
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
					<Typography component="span" variant="body2" color="primary">
						{data?.encuesta?.titulo}
					</Typography>
				</Divider>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px', paddingBottom: '16px', height: '60vh', overflowY: 'scroll', pr: 2, mb: 2 }}>
					<Typography sx={{ ...innerHTMLStyle }} component="span" variant="body1" dangerouslySetInnerHTML={{ __html: data?.encuesta?.descripcion ?? '' }}>
					</Typography>

					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						{
							data?.encuesta?.preguntas.map((pregunta, preguntaIndex) => {
								return (
									Preguntas(pregunta, preguntaIndex)
								)
							})
						}
					</Box>
				</Box>
				<Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 4 }}>
					{siguiente}
				</Box>
				<Box sx={{ paddingTop: '10px' }}></Box>
			</Box>
		</Dialog >
	);
}