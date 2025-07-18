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
    id_curso:           number;
    id_modulo:          number;
    modulo:             string;
    unidad:             number;
    id_elemento:        number;
    tipo_elemento:      string;
    titulo_elemento:    string;
    fecha_elemento:     string;
    contenido_elemento: string;
    creado_por:         number;
    url:                string;
    activo:             number;
    eliminado:          number;
}