export interface Ayuda extends AyudaPayload {
    id?: number;
}

export interface AyudaPayload {
    nombre: string;
    correo: string;
    telefono: string;
    mensaje: string;
    id_plan_estudio: number;
}

export interface AyudaResponse {
    success: boolean;
    data: Ayuda;
}