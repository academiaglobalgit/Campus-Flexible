export interface Ayuda extends AyudaPayload {
    id?: number;
}

export interface AyudaPayload {
    name: string;
    email: string;
    phone: string;
    message: string;
    id_plan_estudios?: string;
}

export interface AyudaResponse {
    success: boolean;
    data: Ayuda;
}