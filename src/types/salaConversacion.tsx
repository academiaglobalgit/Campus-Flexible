export interface SalaConversaCionResponse {
    success: boolean;
    data: SalaConversacion[];
}

export interface SalaConversacion {
    id_mensaje: number;
    mensaje: string;
    fecha_envio: string;
    id_mensaje_respuesta: any;
    id_usuario: number;
    autor: any;
    respuestas: any;
}
