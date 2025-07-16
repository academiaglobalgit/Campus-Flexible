export interface Ayuda extends AyudaPayload {
    id?: number;
}

export interface AyudaPayload {
    nombre: string;
    correo: string;
    telefono: string;
    mensaje: string;
    id_tema_ayuda: number;
    id_plan_estudio?: number;
}

export interface AyudaTutorPayload {
    id_curso:  number;
    id_profesor: number;
    nombre: string;
    correo: string;
    mensaje: string;
    id_tema_ayuda: number;
}

export interface AyudaResponse {
    success: boolean;
    data: Ayuda;
}


export interface AyudaInteriorResponse {
    success: boolean;
    data:    AyudaTickets;
}

export interface AyudaTickets {
    Resuelto: EstadoTicket[];
    Abierto:  EstadoTicket[];
}

export interface EstadoTicket {
    id_ticket:         number;
    folio_seguimiento: string;
    mensaje:           string;
    fecha_creacion:    string;
    estado:            string;
    curso:             string;
    tema_ayuda:        string;
}

export interface AyudaMateriasResponse {
    success: boolean;
    data:    AyudaMateria[];
}

export interface AyudaMateria {
    id_curso:     number;
    nombre_curso: string;
}

export interface AyudaTutoresResponse {
    success: boolean;
    data:    AyudaTutor[];
}

export interface AyudaTutor {
    id_tutor:        number;
    nombre_tutor:    string;
    correo:          string;
    id_curso:        number;
    nombre_curso:    string;
    id_plan_estudio: number;
}

export interface AyudaTemasResponse {
    success: boolean;
    data:    Temas[];
}

export interface Temas {
    id_tema_ayuda: number;
    nombre_tema:   string;
}

export interface TicketsAyudaTutorResponse {
    success: boolean;
    data:    EstadoTicket[];
}