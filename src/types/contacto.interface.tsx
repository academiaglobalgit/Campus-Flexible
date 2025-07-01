export interface ContactoResponse {
    success: boolean;
    data:    Contacto[];
}

export interface Contacto {
    id_contacto_plan:    number;
    id_plan_estudio:     number;
    id_tipo_contacto:    number;
    valor_contacto:      string;
    descripcion:         string;
    fecha_creacion:      string;
    fecha_actualizacion: string;
    id_usuario_modifico: number;
    eliminado:           number;
}
