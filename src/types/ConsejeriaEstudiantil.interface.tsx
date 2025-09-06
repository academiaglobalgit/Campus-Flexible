export interface MotivosCitaResponse {
    success: boolean;
    data:    MotivosCita[];
}

export interface MotivosCita {
    id_motivo:     number;
    nombre_motivo: string;
    descripcion:   string;
}
