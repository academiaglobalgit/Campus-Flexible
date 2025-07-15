export * from './components';
export * from './constants';
export * from './apiTypes';
export * from './authorization';
export * from './descripcionesPantallas';
export * from './menu';
export * from './tipoManuales';

export type { AyudaInteriorResponse, AyudaTickets, EstadoTicket, AyudaMateriasResponse, AyudaMateria, AyudaTutoresResponse, AyudaTutor, AyudaTemasResponse, Temas, AyudaPayload, AyudaTutorPayload } from './ayuda.interface';
export type { BibliotecaVideotecaResponse, BibliotecaVideoteca, BibliotecaResponse, Biblioteca } from './BibliotecaVideoteca.interface';
export type { PlanEstudioInformacionResponse, InformacionData, Cursamiento, Ponderacion, Tutor } from './plan-estudio.interface';
export type { PerfilResponse, Perfil, TelefonoPerfil } from './Perfil.interface';
export type { ServiciosEscolaresResponse, ServiciosEscolares } from './ServiciosEscolares.interface';