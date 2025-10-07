import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "../../../atoms/Button/Button";
import { Dialog } from "../../../atoms/Dialog/Dialog";
import type { EncuestasDatosResponse } from "../../../../types/Encuestas.interface";
import { useNotification } from "../../../../providers/NotificationProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CURSOS_ACTIVOS_ENDPOINTS } from "../../../../types/endpoints";
import { SaveEncuesta } from "../../../../services/CursosActivosService";
import miniLogo from '../../../../assets/AG College.png';

import { innerHTMLStyle } from "@styles";
import EncuestaSecciones from "./Secciones";

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
	const [isDisabled, setIsDisabled] = useState(true);
	const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
	const [step, setStep] = React.useState<"inicio" | "preguntas" | "actualizada">("inicio");

	const totalPreguntas = data?.encuesta?.total_preguntas;

	useEffect(() => {
		setOpen(isOpen ?? false);
	}, [isOpen]);

	const handlSetEncuesta = (respuesta: Respuesta[], idAsignacion: number) => {
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

			setRespuestas([]);
			setOpen(false);
			setIsDisabled(false);
			showNotification(`Encuesta guardada satisfactoriamente`, "success");

			if (onEncuestaEnviada) onEncuestaEnviada(true);
		},
		onError: (error) => {
			console.log(error)
			setOpen(false);
			showNotification(`Error al registrar: ${error.message}`, "error");
		},
		onSettled: () => {
			console.log('La mutación ha finalizado');
		}
	});


	const handleTextChange = (id_pregunta: number, value: string) => {

		setRespuestas(prev => {
			if (!value.trim()) {
				const nuevas = prev.filter(item => item.id_pregunta !== id_pregunta);
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

			return nuevas;
		});
	};

	const handleRadioChange = (id_pregunta: number) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const id_opcion = Number(event.target.value);

			setRespuestas(prev => {
				const existe = prev.some(item => item.id_pregunta === id_pregunta);
				const nuevas = existe
					? prev.map(r =>
						r.id_pregunta === id_pregunta ? { id_pregunta, id_opcion } : r
					)
					: [...prev, { id_pregunta, id_opcion }];
				return nuevas;
			});
		};

	const PantallaInicial: React.FC<{ data: any; onNext: () => void }> = ({ data, onNext }) => (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Divider sx={{
				'& .MuiDivider-wrapper': {
					borderRadius: '50px',
					padding: '5px 10px 5px 10px',
				},
			}}
			>
			</Divider>

			<Box
				component="img"
				src={miniLogo}
				alt="AG College Logo"
				sx={{
					width: '300px',
					maxWidth: '150px',
					marginBottom: '16px',
					objectFit: 'contain',
				}}
			/>
			<Typography component="h4" variant="h4" color="primary">
				{data?.encuesta?.titulo}
			</Typography>
			<Typography sx={{ ...innerHTMLStyle }} component="span" variant="body1" dangerouslySetInnerHTML={{ __html: data?.encuesta?.descripcion ?? '' }}>
			</Typography>
			<Typography component="span" variant="body2" color="primary">Esta encuesta incluye {totalPreguntas} preguntas
			</Typography>
			<Button
				onClick={onNext}
			>
				Comenzar Encuesta
			</Button>

		</Box>
	);

	let content: React.ReactNode;

	switch (step) {
		case "inicio":
			content = <PantallaInicial data={data} onNext={() => setStep("preguntas")} />;
			break;
		case "preguntas":
			content = <EncuestaSecciones
				data={data}
				respuestas={respuestas}
				handleRadioChange={handleRadioChange}
				handleTextChange={handleTextChange}
				isDisabled={isDisabled}
				setIsDisabled={setIsDisabled}
				onFinish={() => {
					if (data) handlSetEncuesta(respuestas, data.idAsignacion);
				}}
			/>
			break;
		case "actualizada":
			content = '';
			break;
		default:
			content = '';
	}

	return (
		<Dialog isOpen={open} sxProps={{ backgroundColor: '#fff', margin: '5px', ...(isMobile ? { width: '100%' } : {}) }} >
			<Box sx={[
				{ display: 'flex', flexDirection: 'column' },
				isMobile ? { padding: '15px' } : { padding: '30px' },
				!isMobile && { width: '700px' }
			]}>
				{content}
			</Box>
		</Dialog >
	);
}