export interface ServiciosEscolaresResponse {
    success: boolean;
    data:    ServiciosEscolares[];
}

export interface ServiciosEscolares {
    id_servicio_escolar: number;
    nombre_servicio:     string;
    descripcion:         string;
    precio:              string;
    image:               string;
}
