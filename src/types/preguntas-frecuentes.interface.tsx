export interface PreguntasFrecuentesResponse {
    success: boolean;
    data:    Pregunta[];
}

// export interface Pregunta {
//     id:               number;
//     id_plan_estudios: number;
//     pregunta:         string;
//     respuesta:        string;
//     grupo:            string;
//     question_order:   number;
//     created_at:       string;
//     deleted_at:       string;
//     deleted_by:       string;
//     is_deleted:       number;
// }


export interface Pregunta {
    id_pregunta_frecuente: number;
    id_seccion_faq:        number;
    id_plan_estudio:       number;
    pregunta:              string;
    respuesta:             string;
    orden:                 number;
    fecha_creacion:        string;
    fecha_actualizacion:   string;
    id_usuario_modifico:   number;
    eliminado:             number;
    nombre_seccion:        string;
}
