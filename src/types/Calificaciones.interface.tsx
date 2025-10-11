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
    url_accredible:       string;
    estatus_curso_alumno: string;
    fecha_registro      : string;
}

export interface Glosario {
    id_glosario: number;
    termino:     string;
    descripcion: string;
}


export interface CalificacionDetalleResponse {
    id_curso:                string;
    curso:                   string;
    detalle:                 CalificacionDetalle[];
    promedio:                number;
    promedios_por_categoria: PromediosPorCategoria;
}

export interface CalificacionDetalle {
    tipo_recurso:  string;
    valor_total:   number;
    promedio_tipo: number;
    recursos:      Recurso[];
}

export interface Recurso {
    recurso:      string;
    valor:        number;
    calificacion: number | null;
}

export interface PromediosPorCategoria {
    Actividades:  number;
    Evaluaciones: number;
    Foros:        number;
}
