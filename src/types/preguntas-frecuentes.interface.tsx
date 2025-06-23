export interface PreguntasFrecuentesResponse {
    success: boolean;
    data:    Pregunta[];
}

export interface Pregunta {
    id:               number;
    id_plan_estudios: number;
    pregunta:         string;
    respuesta:        string;
    grupo:            string;
    question_order:   number;
    created_at:       string;
    deleted_at:       string;
    deleted_by:       string;
    is_deleted:       number;
}
