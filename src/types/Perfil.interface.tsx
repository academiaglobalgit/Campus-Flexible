export interface PerfilResponse {
    success: boolean;
    data:  Perfil;
}

export interface Perfil {
    apellido_materno: string;
    apellido_paterno: string;
    correo:           string;
    curp:             string;
    fecha_nacimiento: string;
    foto_perfil_url:  string;
    matricula:        string;
    nombre_ciudad:    string;
    nombre_estado:    string;
    nombre_genero:    string;
    nombre_pais:      string;
    nombre:           string;
    telefonos:        TelefonoPerfil[];
}

export interface TelefonoPerfil {
    id_telefono:   number;
    tipo:          string;
    numero:        string;
    observaciones: string;
}

export interface PerfilPayload {
    correo:             string;
    foto_perfil_url:    File | null;
    telefonos:          any[];
}

export type PreviewFile = {
  file: File;
  preview?: string;
};