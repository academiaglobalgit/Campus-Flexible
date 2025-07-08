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
