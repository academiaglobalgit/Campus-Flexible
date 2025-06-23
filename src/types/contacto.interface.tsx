export interface ContactoResponse {
    success: boolean;
    data:    Contacto[];
}

export interface Contacto {
    id:               number;
    id_plan_estudios: number;
    contacto:         string;
    type:             string;
    created_at:       string;
    deleted_at:       string;
    deleted_by:       number;
    is_deleted:       number;
}
