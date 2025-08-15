export interface TerminosCondiciones {
    success: boolean;
    data: Datos;
}
export interface Datos {
    id_documento: number;
    id_tipo_documento: number;
    descripcion: string;
    version: string;
    url_pdf: string;
    fecha_publicacion: string;
    activo: number;
    id_plan_estudio: number;
    contenido_html: string;
}
