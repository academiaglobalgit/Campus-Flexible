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
    estado_inscripcion: number;
}
