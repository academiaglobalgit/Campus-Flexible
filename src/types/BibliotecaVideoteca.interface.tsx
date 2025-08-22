export interface BibliotecaVideotecaResponse {
    success: boolean;
    data:    BibliotecaVideoteca[];
}

export interface BibliotecaVideoteca {
    id_modulo_campus: number;
    titulo:           string;
    descripcion_html: string;
    icono:            string;
    banner:           string;
    visible_en_menu:  number;
    orden:            number;
    url_modulo:       string;
}

export interface BibliotecaResponse {
    success: boolean;
    data:    Biblioteca;
}

export interface Biblioteca {
    id_modulo_campus: number;
    titulo_modulo:    string;
    descripcion_html: string;
    url_modulo:       string;
    icono:            string;
    banner:           string;
    visible_en_menu:  number;
    orden:            number;
}

export interface ListadoVideotecaResponse {
    success: boolean;
    data:    ListadoVideoteca[];
}

export interface ListadoVideoteca {
    id_grupo: number;
    seccion: string;
    parent_id: number;
    orden_seccion: number;
    tipo_seccion: string;
    recursos: ListadoVideotecaRecursos[];
}
export interface ListadoVideotecaRecursos {
    id_grupo: any;
    curso?: string;
    id_recurso:      number;
    titulo:          string;
    descripcion:     string;
    url_recurso:     string;
    periodo:         number;
    orden:           number;
    id_tipo_recurso: number;
    id_curso:        number;
    nombre_curso:    string;
    parent_id:    string | number;

}