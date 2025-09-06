export interface DatosSalaConversacionResponse {
    success: boolean;
    data:    DatosSalaConversacion[];
}

export interface DatosSalaConversacion {
    id_conversacion: number;
    titulo:          string;
    fecha_creacion:  string;
    plan_estudio:    string;
}

export interface SalaConversacionResponse {
    success: boolean;
    data:    DataSala;
}

export interface DataSala {
    totalPaginas: number;
    mensajes:     SalaConversacion[];
}

export interface SalaConversacion {
    id_mensaje:             number;
    mensaje:                string;
    fecha_envio:            string;
    id_mensaje_respuesta:   number;
    id_usuario:             number;
    autor:                  string;
    respuestas:             SalaConversacion[];
    foto_perfil_url:        string;
}
export interface SalaConversacionEnviarMensaje {
    id_mensaje?: null | number;
    id_conversacion: number;
    mensaje: string;
    id_mensaje_respuesta?: null | number;
}
export interface SalaConversacionEliminarMensaje {
    id_mensaje: number;
}

export interface TemaForoByIdResponse {
    success: boolean;
    data:    TemaForo[];
}

export interface TemaForo {
    id_recurso:         number;
    titulo:             string;
    fecha_creacion:     string;
    plan_estudio:       string;
    contenido_elemento: string;
}


export interface ForosSaveResponse {
    success: boolean;
    data:    ForosSave;
}

export interface ForosSave {
    operacion:  string;
    id_mensaje: number;
    mensaje:    SalaConversacion;
}

export interface ForoMensajesResponse {
    success: boolean;
    data:    ForoMensajes;
}

export interface ForoMensajes {
    totalPaginas: number;
    mensajes:     Mensaje[];
}

export interface Mensaje extends SalaConversacion {
    creador:              number;
}

