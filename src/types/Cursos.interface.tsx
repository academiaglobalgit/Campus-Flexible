export interface CursosActivosResponse {
    success: boolean;
    data:    CursoActivo[];
}

export interface CursoActivo {
    id_curso:         number;
    titulo_curso:     string;
    progreso:         number;
    id_usuario_tutor: number;
    nombre_tutor:     string;
    correo:           string;
    fecha_inicio:     string;
    fecha_fin:        string;
    estatus:          string;
}


export interface CursosTabsResponse {
    success: boolean;
    data:    CursosTabs[];
}

export interface CursosTabs {
    estatus_respuesta: string;
    id_curso:           number;
    id_modulo:          number;
    modulo:             string;
    unidad:             number;
    id_recurso:         number;
    tipo_elemento:      string;
    titulo_elemento:    string;
    fecha_elemento:     string;
    contenido_elemento: string;
    creado_por:         number;
    url:                string;
    estatus:            string;
    activo:             number;
    eliminado:          number;
}

export interface CursosActividadesResponse {
    success: boolean;
    data:    CursosActividades;
}

export interface CursosActividades {
    actividades:          Actividad[];
    manuales_actividades: ManualesActividad[];
}

export interface Actividad {
    id_curso:           number;
    id_modulo:          number;
    modulo:             string;
    unidad:             number;
    id_recurso:         number;
    tipo_elemento:      string;
    titulo_elemento:    string;
    fecha_elemento:     Date;
    contenido_elemento: string;
    creado_por:         null;
    url:                null;
    estatus:            string;
    activo:             number;
    eliminado:          number;
    hasEntrega:         number;
    entrega:            Entrega | null;
    calificacion:       string | null;
}

export interface Entrega {
    id_entrega:          number;
    id_usuario:          number;
    id_recurso:          number;
    contenido_entregado: string;
    fecha_entrega:       string;
    calificacion:        string;
    retroalimentacion:   string;
    calificado_por:      string;
    fecha_calificacion:  string;
    activo:              number;
    eliminado:           number;
    archivos:            Archivo[];
}

export interface Archivo {
    id_archivo:      number;
    nombre_original: string;
    ruta_archivo:    string;
    tipo_mime:       string;
}

export interface ManualesActividad {
    id_manual:      number;
    id_tipo_manual: number;
    titulo:         string;
    url_archivo:    string;
}


export interface CursosTutoriasResponse {
    success: boolean;
    data:    Tutoria[];
}

export interface Tutoria {
    id_tutoria:     number;
    titulo:         string;
    descripcion:    string;
    fecha_inicio:   string;
    fecha_fin:      string;
    calendario_url: string;
    reunion_url:    string;
    grabacion_url:  string;
    estatus:        string;
    expirada:       boolean;
    recursos:       RecursoTutoria[];
}

export interface RecursoTutoria {
    id_tutoria:         number;
    id_recurso_tutoria: number;
    titulo:             string;
    descripcion:        string;
    url:                string;
}

export interface ActividadEntregadaResponse {
    success: boolean;
    data:    ActividadEntregada;
}

export interface ActividadEntregada {
    entrega:  ActividadEntrega;
    archivos: ActividadEntregadaArchivo[];
}

export interface ActividadEntregadaArchivo {
    id_archivo:      number;
    id_entrega:      number;
    nombre_original: string;
    ruta_archivo:    string;
    tipo_mime:       string;
    fecha_subida:    string;
}

export interface ActividadEntrega {
    id_entrega:          number;
    id_usuario:          number;
    id_recurso:          number;
    fecha_entrega:       string;
    contenido_entregado: string;
    calificacion:        string;
    retroalimentacion:   string;
    calificado_por:      string;
    fecha_calificacion:  string;
    estatus_respuesta:   string;
    activo:              number;
    eliminado:           number;
}


export interface CursosListaPendientesResponse {
    success: boolean;
    data:    ListaPendientes[];
}

export interface ListaPendientes {
    id_recurso:      number;
    id_tipo_recurso: number;
    titulo:          string;
    tipo_recurso:    string;
    entregado:       number;
    orden:           number;
}

export interface CursosForosResponse {
    success:    boolean;
    data:       CursosForos;
}

export interface CursosForos {
    foros:  CursosTabs[];
    manual: ManualesActividad[];
}
