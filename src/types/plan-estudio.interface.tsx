export interface PlanEstudioResponse {
    success: boolean;
    data:    PlanEstudio[];
}

export interface PlanEstudio {
    id_curso:           number;
    nombre_curso:       string;
    descripcion_curso:  string;
    orden:              number;
    obligatorio:        number;
    periodo:            number;
    id_inscripcion_curso: number;
    estatus_curso_alumno: string;
}

export interface PlanEstudioMateriasResponse {
    id:       number;
    periodo:  number;
    materias: Materia[];
}

export interface Materia {
    id_curso: number;
    titulo: string;
    status: string;
}


export interface PlanEstudioInformacionResponse {
    success: boolean;
    data:    InformacionData;
}

export interface InformacionData {
    informacion: Informacion;
    cursamiento: Cursamiento;
    tutor:       Tutor;
}

export interface Cursamiento {
    modalidad_materia: string;
    ponderaciones:     Ponderacion[];
}

export interface Ponderacion {
    tipo:       string;
    porcentaje: number;
}

export interface Informacion {
    nombre_curso:     string;
    longitud:         number;
    idioma:           string;
    nivel:            string;
    tipo_informacion: string;
    descripcion:      string;
    modalidad:        string;
}

export interface Tutor {
    id_usuario:         number;
    apellido_materno:   string;
    apellido_paterno:   string;
    correo:             string;
    descripcion_perfil: string;
    foto_perfil_url:    string;
    grado_estudio:      string;
    nombre:             string;
}
