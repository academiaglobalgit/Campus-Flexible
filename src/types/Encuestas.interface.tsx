
export interface EncuestasResponse {
    success:    boolean;
    data:       EncuestasDatosResponse[];
}

export interface EncuestasDatosResponse {
    id_asignacion: number;
    id_encuesta: string;
    estatus: string;
    fecha_asignacion: string;
    fecha_limite: string;
    fecha_completado: string;
    titulo: string;
    descripcion: string;
    tipo: string;
    total_preguntas: number;
    estado_encuesta: string;
    progreso: number;
    preguntas: Preguntas[]
}

export interface Preguntas {
    id_pregunta: number;
    titulo_pregunta: string;
    tipo_pregunta: string;
    es_obligatoria: number;
    orden: number;
    opciones: Opciones[]
}
export interface Opciones {
    id_opcion: number;
    id_pregunta: number;
    etiqueta: string;
    valor: string;
    puntuacion: string;
    orden: number;
}
