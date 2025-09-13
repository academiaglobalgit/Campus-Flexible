import { Box, Divider, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import type { EncuestasDatosResponse, Preguntas } from "../../../../types/Encuestas.interface";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNotification } from "../../../../providers/NotificationProvider";
import { CheckBoxLabel } from "../../../atoms/Checkbox/Checkbox";
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
};

type Respuesta =
	| { id_pregunta: number; id_opcion: number }
	| { id_pregunta: number; respuesta_texto: string };

export const EncuestasModal: React.FC<EncuestaDialogProps> = ({ isOpen, data }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const queryClient = useQueryClient();
	const { showNotification } = useNotification();
	const [open, setOpen] = React.useState(false);
	const [isDisabled, setIsDisabled] = React.useState(true);
	const [isSending, setIsSending] = React.useState(false);
	const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
	const [selectedByQuestion, setSelectedByQuestion] = useState<Record<number, number | null>>({});
	const totalPreguntas = data?.encuesta?.preguntas.length;

	useEffect(() => {
		setOpen(isOpen ?? false);
	}, [isOpen]);

	function upsertRespuesta(
		prev: Respuesta[],
		nueva: Respuesta
	): Respuesta[] {
		const i = prev.findIndex(r => r.id_pregunta === nueva.id_pregunta);

		// solo exista uno de los campos (id_opcion O respuesta_texto)
		const limpia =
			'id_opcion' in nueva
				? { id_pregunta: nueva.id_pregunta, id_opcion: nueva.id_opcion } as Respuesta
				: { id_pregunta: nueva.id_pregunta, respuesta_texto: nueva.respuesta_texto } as Respuesta;

		if (i === -1) return [...prev, limpia];
		const next = [...prev];
		next[i] = limpia;
		return next;
	}

	useEffect(() => {
		validarEncuesta(respuestas);
	}, [respuestas]);

	const handleSelect = (id_pregunta: number, id_opcion: number) => {
		setSelectedByQuestion(prev => ({
			...prev,
			[id_pregunta]: prev[id_pregunta] === id_opcion ? null : id_opcion,
		}));

		setRespuestas(prev => {
			const yaSeleccionado = selectedByQuestion[id_pregunta] === id_opcion;
			if (yaSeleccionado) {
				return prev.filter(r => r.id_pregunta !== id_pregunta);
			}
			return upsertRespuesta(prev, { id_pregunta, id_opcion });
		});
	};

	const handleTextChange = (id_pregunta: number, value: string) => {
		setSelectedByQuestion(prev => ({ ...prev, [id_pregunta]: null }));
		setRespuestas(prev => {
			if (!value.trim()) {
				return prev.filter(r => r.id_pregunta !== id_pregunta);
			}
			return upsertRespuesta(prev, { id_pregunta, respuesta_texto: value });
		});
	};

	function validarEncuesta(respuesta: any) {
		const totalRespuestas = respuesta.length
		totalPreguntas === totalRespuestas ? setIsDisabled(false) : setIsDisabled(true)
	}

	const handlSetEncuesta = (respuesta: any, idAsignacion: any) => {
		setIsSending(true);
		setIsDisabled(true);
		createMutation.mutate({ respuestas: respuesta, id_asignacion: idAsignacion });
	}

	const createMutation = useMutation({
		mutationFn: SaveEncuesta,
		onSuccess: async () => {

			setIsSending(false);
			setOpen(false);
			showNotification(`Encuesta guardada satisfactoriamente`, "success");

			await queryClient.invalidateQueries({
				queryKey: [CURSOS_ACTIVOS_ENDPOINTS.GET_MATERIAS.key],
				exact: true,
			});


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
			onClick={() => handlSetEncuesta(respuestas,data?.idAsignacion)}
			iconPosition={'end'}
			isLoading={isSending}
			disabled={isDisabled}
			icon={<ArrowForwardIcon />}

		>
			Enviar encuesta
		</Button>
	);

	const Preguntas = (item: Preguntas, index: number) => (
		<>
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
				<Typography component="span" variant="body2" color="text">
					{item.titulo_pregunta}
				</Typography>
			</Box>

			{item.tipo_pregunta === "escala" && (
				<Box key={"preguntas-" + item.id_pregunta} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
					{item.opciones.map((opcion) => {
						const checked = selectedByQuestion[item.id_pregunta] === opcion.id_opcion;
						return (
							<CheckBoxLabel
								key={opcion.id_opcion}
								text={opcion.etiqueta}
								checked={!!checked}
								onChange={() => handleSelect(item.id_pregunta, opcion.id_opcion)}
								sxProps={{
									marginLeft: "10px",
									display: "flex",
									alignItems: "center",
									padding: "10px",
									gap: "8px",
									alignSelf: "stretch",
									borderRadius: "8px",
									border: "1px solid var(--Gray-50, #dcdfe0ff)"
								}}
							/>
						);
					})}
				</Box>
			)}

			{item.tipo_pregunta === "abierta" && (
				<TextField
					fullWidth
					size="small"
					placeholder="Escribe tu respuesta"
					onChange={(e) => handleTextChange(item.id_pregunta, e.target.value)}
					// opcional: valor actual si ya existe en respuestas
					value={
						(respuestas.find(r => r.id_pregunta === item.id_pregunta) as any)?.respuesta_texto ?? ""
					}
					sx={{ mt: 1 }}
				/>
			)}
		</>
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