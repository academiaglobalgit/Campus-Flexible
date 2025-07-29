export * from './components';
export * from './constants';
export * from './apiTypes';
export * from './authorization';
export * from './descripcionesPantallas';
export * from './menu';
export * from './tipoManuales';

export type { AyudaInteriorResponse, AyudaTickets, EstadoTicket, AyudaMateriasResponse, AyudaMateria, AyudaTutoresResponse, AyudaTutor, AyudaTemasResponse, Temas, AyudaPayload, AyudaTutorPayload, TicketsAyudaTutorResponse } from './ayuda.interface';
export type { BibliotecaVideotecaResponse, BibliotecaVideoteca, BibliotecaResponse, Biblioteca } from './BibliotecaVideoteca.interface';
export type { PlanEstudioInformacionResponse, InformacionData, Cursamiento, Ponderacion, Tutor } from './plan-estudio.interface';
export type { PerfilResponse, Perfil, TelefonoPerfil, PerfilPayload } from './Perfil.interface';
export type { ServiciosEscolaresResponse, ServiciosEscolares } from './ServiciosEscolares.interface';

export type { 
    CursosActivosResponse, 
    CursoActivo, 
    CursosTabsResponse, 
    CursosTabs, 
    CursosActividadesResponse, 
    CursosActividades, 
    Actividad, 
    Entrega, 
    Archivo,
    CursosTutoriasResponse,
    Tutoria,
    RecursoTutoria,
    ActividadEntregadaResponse,
    ActividadEntregada,
    ActividadEntregadaArchivo,
    ManualesActividad,
    CursosListaPendientesResponse,
    ListaPendientes
} from './Cursos.interface';

export type {
    TemaForoByIdResponse,
    TemaForo,
    ForosSaveResponse,
    ForosSave,
    Mensaje,
} from './SalaConversacion.interface';

export type {
    NotificacionesResponse,
    Notificaciones,    
} from './Notificaciones.interface';