export interface ModulosDatosResponse {
    success: boolean;
    data: Datos;
}
export interface Datos {
    id_modulo_campus: number;
    titulo_modulo: string;
    descripcion_html: string;
    url_modulo: string;
    icono: string;
    banner: string;
    visible_en_menu: number;
    orden: number;
}
