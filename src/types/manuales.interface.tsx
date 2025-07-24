export interface ManualesResponse {
    success: boolean;
    message: string;
    url: string;
}
export interface ManualesUsuarioResponse {
    id_manual: number;
    titulo?: string;
    descripcion: string;
    url_archivo?: string;
    data?: [];
}
export interface LineamientosUsuarioResponse {
    id_manual: number;
    titulo?: string;
    descripcion: string;
    url_archivo?: string;
    data?: [];
}