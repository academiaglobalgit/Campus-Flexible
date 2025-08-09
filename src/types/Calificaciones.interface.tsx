export interface CalificacionesResponse {
    success: boolean;
    data:    CalificacionData;
}

export interface CalificacionData {
    cursos:           CalificacionCurso[];
    promedio_general: string;
    glosario:         Glosario[];
}

export interface CalificacionCurso {
    id_curso:             number;
    nombre_curso:         string;
    descripcion_curso:    string;
    orden:                number;
    obligatorio:          number;
    periodo:              number;
    id_inscripcion_curso: number;
    calificacion:         string;
    estatus_curso_alumno: string;
}

export interface Glosario {
    id_glosario: number;
    termino:     string;
    descripcion: string;
}
