import { Ayuda, Contacto, ManualInduccion, PreguntasFrecuentes, ServiciosEscolares } from "../assets/IconsCustomize";

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
    VIDEOS_LECTURAS: "Videos y lecturas de interes",
    SERVICIOS_ESCOLORES: "Servicios Escolares",
    CONTACTO: "Contacto",
    MANUAL_INDUCCION: "Manual de inducción",
    FAQS: "Faqs"
}

export type TitleScreen = typeof TitleScreen;

export const MenuRoutes = [
    { text: TitleScreen.CALIFICACIONES, icon: undefined, path: AppRoutingPaths.CALIFICACIONES, order: 3 },
    { text: TitleScreen.MIRUTA, icon: undefined, path: AppRoutingPaths.MIRUTA, order: 7 },
    { text: TitleScreen.CURSOS_ACTIVOS, icon: undefined, path: AppRoutingPaths.CURSOS_ACTIVOS, order: 1 },
    { text: TitleScreen.CURSOS_CERTIFICACIONES, icon: undefined, path: AppRoutingPaths.CURSOS_CERTIFICACIONES, order: 4},
    { text: TitleScreen.PLAN_ESTUDIOS, icon: undefined, path: AppRoutingPaths.PLAN_ESTUDIOS, order: 0 },
    { text: TitleScreen.CALENDARIO, icon: undefined, path: AppRoutingPaths.CALENDARIO, order: 2 },
    { text: TitleScreen.VIDEOS_LECTURAS, icon: undefined, path: AppRoutingPaths.VIDEOS_LECTURAS, order: 6 },
    { text: TitleScreen.SALA_CONVERSACIONES, icon: undefined, path: AppRoutingPaths.SALA_CONVERSACIONES, order: 5 },
] as const;

export type MenuRoutes = typeof MenuRoutes;

export const MenuInformacion = [
    { text: TitleScreen.SERVICIOS_ESCOLORES, icon: ServiciosEscolares, path: AppRoutingPaths.SERVICIOS_ESCOLORES, order: 0 },
    { text: TitleScreen.AYUDA, icon: Ayuda, path: AppRoutingPaths.AYUDA_INTERIOR, order: 1 },
    { text: TitleScreen.CONTACTO, icon: Contacto, path: AppRoutingPaths.CONTACTO, order: 2 },
    { text: TitleScreen.FAQS, icon: PreguntasFrecuentes, path: AppRoutingPaths.PREGUNTAS_FRECUENTES_INT, order: 3},
    { text: TitleScreen.MANUAL_INDUCCION, icon: ManualInduccion, path: AppRoutingPaths.MANUAL_INDUCCION, order: 4 },
] as const;

export type MenuInformacion = typeof MenuInformacion;

export type MenuType = 'menuRoutes' | 'menuInformacion';