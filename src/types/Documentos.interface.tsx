export interface DocumentosResponse {
    success: boolean;
    data:    Documento[];
}

export interface Documento {
    id_manual:      number;
    titulo:         string;
    descripcion:    string | null;
    url_archivo:    string | null;
    id_tipo_manual: number;
    nombre_tipo:    string;
}
