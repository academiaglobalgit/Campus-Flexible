export interface NotificacionesResponse {
    success: boolean;
    data: Notificaciones[];
}
export interface Notificaciones {
    id_notificacion:    number;
    tipo_notificacion:  string;
    titulo:             string;
    mensaje:            string;
    leida:              number;
    fecha_envio:        string;
    enlace_accion:      string;
}
