import { Ayuda, Biblioteca, Calendario, Calificaciones, Contacto, CursosCertificaciones, Home, ManualInduccion, PreguntasFrecuentes, SalaConversacion, ServiciosEscolares } from "../assets/IconsCustomize";

export const AppRoutingPaths = {
    AYUDA_EXTERIOR: "/help-ext",
    AYUDA_INTERIOR: "/help",
    BIBLIOTECA: "/biblioteca",
    BLANK: "",
    CALENDARIO: "/calendario",
    CALIFICACIONES: "/calificaciones",
    CURSOS_ACTIVOS: "/cursos-activos",
    CURSOS_CERTIFICACIONES: "/certificaciones",
    ERROR: "/error",
    HOME: "/",
    LOGIN: "/login",
    MIRUTA: "/miruta",
    MI_PERFIL: "/mi-perfil",
    MI_PERFIL_EDIT: "/edit-perfil",
    NOTFOUND: '*',
    PREGUNTAS_FRECUENTES: "/faqs-ext",
    PREGUNTAS_FRECUENTES_INT: "/faqs",
    PLAN_ESTUDIOS: "/plan-estudios",
    SALA_CONVERSACIONES: "/sala",
    VIDEOS_LECTURAS: "/videos",
    SERVICIOS_ESCOLORES: "/serv-esco",
    CONTACTO: "/contact",
    MANUAL_INDUCCION: "/manual",
    PLAN_ESTUDIO_INFORMACION: "/informacion"

} as const;

export type AppRoutingPaths = typeof AppRoutingPaths;

export const TitleScreen = {
    AYUDA: "Ayuda",
    BIBLIOTECA: "Biblioteca",
    BIBLIOTECA_VIRTUAL: "Biblioteca virtual",
    CALENDARIO: "Calendario",
    CALIFICACIONES: "Calificaciones",
    CURSOS_ACTIVOS: "Cursos Activos",
    CURSOS_CERTIFICACIONES: "Cursos y certificaciones",
    HOME: "Inicio",
    MI_PERFIL: "Mi Perfil",
    MIRUTA: "Mi Ruta",
    PLAN_ESTUDIOS: "Plan de estudios",
    PREGUNTAS_FRECUENTES: "Preguntas Frecuentes",
    SALA_CONVERSACIONES: "Sala de conversación",
    VIDEOS_LECTURAS: "Videos y Lecturas de interés",
    SERVICIOS_ESCOLORES: "Servicios Escolares",
    CONTACTO: "Contacto",
    MANUAL_INDUCCION: "Manual de inducción",
    FAQS: "Faqs",
    BACK_HOME_EXT: "Regresar a inicio"
}

export type TitleScreen = typeof TitleScreen;

export const MenuRoutes: Menu[] = [
    { text: TitleScreen.PLAN_ESTUDIOS, icon: Home, path: AppRoutingPaths.PLAN_ESTUDIOS, order: 0, visible: 1, children:[] },
    { text: TitleScreen.CURSOS_ACTIVOS, icon: CursosCertificaciones, path: AppRoutingPaths.CURSOS_ACTIVOS, order: 1, visible: 1, children:[] },
    { text: TitleScreen.CALIFICACIONES, icon: Calificaciones, path: AppRoutingPaths.CALIFICACIONES, order: 2, visible: 1, children:[] },
    { text: TitleScreen.CALENDARIO, icon: Calendario, path: AppRoutingPaths.CALENDARIO, order: 3, visible: 1, children:[] },
    { text: TitleScreen.BIBLIOTECA, icon: Biblioteca, path: AppRoutingPaths.BIBLIOTECA, order: 4, visible: 1, children:[] },
    { text: TitleScreen.CURSOS_CERTIFICACIONES, icon: CursosCertificaciones, path: AppRoutingPaths.CURSOS_CERTIFICACIONES, order: 5, visible: 0, children:[]},
    { text: TitleScreen.SALA_CONVERSACIONES, icon: SalaConversacion, path: AppRoutingPaths.SALA_CONVERSACIONES, order: 6, visible: 0, children:[] },
    { text: TitleScreen.MIRUTA, icon: undefined, path: AppRoutingPaths.MIRUTA, order: 7, visible: 0, children:[] },
] as const;

export type MenuRoutes = typeof MenuRoutes;

export const MenuInformacion = [
    { text: TitleScreen.SERVICIOS_ESCOLORES, icon: ServiciosEscolares, path: AppRoutingPaths.SERVICIOS_ESCOLORES, order: 0, visible: 1 },
    { text: TitleScreen.AYUDA, icon: Ayuda, path: AppRoutingPaths.AYUDA_INTERIOR, order: 1, visible: 1 },
    { text: TitleScreen.CONTACTO, icon: Contacto, path: AppRoutingPaths.CONTACTO, order: 2, visible: 1 },
    { text: TitleScreen.FAQS, icon: PreguntasFrecuentes, path: AppRoutingPaths.PREGUNTAS_FRECUENTES_INT, order: 3, visible: 1 },
    { text: TitleScreen.MANUAL_INDUCCION, icon: ManualInduccion, path: AppRoutingPaths.MANUAL_INDUCCION, order: 4, visible: 1 },
] as const;

export type MenuInformacion = typeof MenuInformacion;

export type MenuType = 'menuRoutes' | 'menuInformacion';

export interface Menu {
    text:     string;
    icon:     any;
    path:     string;
    order:    number;
    visible:  number;
    children: Child[];
}

export interface Child {
    text: string;
    path: string;
}