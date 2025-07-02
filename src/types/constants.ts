import * as Icons from "@iconsCustomizeds";

export const AppRoutingPaths = {
    AYUDA_EXTERIOR: "/help-ext",
    AYUDA_INTERIOR: "/help",
    BIBLIOTECA: "/biblioteca",
    BLANK: "",
    CALENDARIO: "/calendario",
    CALIFICACIONES: "/calificaciones",
    CURSOS_ACTIVOS: "/cursos-activos",
    CURSOS_ACTIVOS_DETALLES: "/cursos-detalles/:id",
    CURSOS_CERTIFICACIONES: "/cursos-certificaciones",
    ERROR: "/error",
    HOME: "/",
    LOGIN: "/login",
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
    PLAN_ESTUDIO_INFORMACION: "/informacion",
    CONSEJERIA: "/consejeria",
    BOLETIN_EDUCATIVO: "/boletin",
    CERTIFICACIONES: "/cert",
    BOLSA_TRABAJO: "/bolsa-trab",
    PIZARRON: "/pizarron",
    MI_TRAYECTO: "/mi-trayecto",
    TERMINOSCONDICIONES: "/terminos-condiciones",
    APRENDE_MAS: "more",

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
    PLAN_ESTUDIOS: "Plan de estudios",
    PREGUNTAS_FRECUENTES: "Preguntas Frecuentes",
    SALA_CONVERSACIONES: "Sala de conversación",
    VIDEOS_LECTURAS: "Videos y Lecturas de interés",
    SERVICIOS_ESCOLORES: "Servicios Escolares",
    CONTACTO: "Contacto",
    MANUAL_INDUCCION: "Manual de inducción",
    FAQS: "Faqs",
    BACK_HOME_EXT: "Regresar a inicio",
    NUEVA_SOLICITUD: "Nueva Solicitud",
    CONSEJERIA: "Consejería",
    BOLETIN_EDUCATIVO: "Boletín Educativo",
    CERTIFICACIONES: "Certificaciones",
    BOLSA_TRABAJO: "Bolsa de Trabajo",
    PIZARRON: "Pizarron del éxito",
    MI_TRAYECTO: "Mi Trayecto",
    APRENDE_MAS: "Aprende Más",
    TERMINOS_CONDICIONES: "Términos y Condiciones",
}

export type TitleScreen = typeof TitleScreen;

export const MenuRoutes: Menu[] = [
    { text: TitleScreen.PLAN_ESTUDIOS, icon: Icons.Home, path: AppRoutingPaths.PLAN_ESTUDIOS, order: 0, visible: 1, children:[], menu: 'main' },
    { text: TitleScreen.CURSOS_ACTIVOS, icon: Icons.CursosCertificaciones, path: AppRoutingPaths.CURSOS_ACTIVOS, order: 1, visible: 1, children:[], menu: 'main', hasCount: true },
    { text: TitleScreen.CALIFICACIONES, icon: Icons.Calificaciones, path: AppRoutingPaths.CALIFICACIONES, order: 2, visible: 1, children:[], menu: 'main' },
    { text: TitleScreen.CALENDARIO, icon: Icons.Calendario, path: AppRoutingPaths.CALENDARIO, order: 3, visible: 1, children:[], menu: 'main' },
    { text: TitleScreen.BIBLIOTECA, icon: Icons.Biblioteca, path: AppRoutingPaths.BIBLIOTECA, order: 4, visible: 1, children:[], menu: 'main' },
    { text: TitleScreen.CONSEJERIA, icon: Icons.CursosCertificaciones, path: AppRoutingPaths.CONSEJERIA, order: 5, visible: 1, children:[], menu: 'main'},
    { text: TitleScreen.SALA_CONVERSACIONES, icon: Icons.SalaConversacion, path: AppRoutingPaths.SALA_CONVERSACIONES, order: 6, visible: 1, children:[], menu: 'main' },
    { text: TitleScreen.BOLETIN_EDUCATIVO, icon: Icons.BoletinAcademico, path: AppRoutingPaths.BOLETIN_EDUCATIVO, order: 7, visible: 1, children:[], menu: 'more' },
    { text: TitleScreen.CERTIFICACIONES, icon: Icons.Certificaciones, path: AppRoutingPaths.CERTIFICACIONES, order: 8, visible: 1, children:[], menu: 'more' },
    { text: TitleScreen.BOLSA_TRABAJO, icon: Icons.BolsaTrabajo, path: AppRoutingPaths.BOLSA_TRABAJO, order: 9, visible: 1, children:[], menu: 'more' },
    { text: TitleScreen.PIZARRON, icon: Icons.PizarronExito, path: AppRoutingPaths.PIZARRON, order: 10, visible: 1, children:[], menu: 'more' },
    { text: TitleScreen.MI_TRAYECTO, icon: Icons.MiTrayecto, path: AppRoutingPaths.MI_TRAYECTO, order: 11, visible: 1, children:[], menu: 'more' },
    { text: TitleScreen.APRENDE_MAS, icon: Icons.VerMas, path: AppRoutingPaths.APRENDE_MAS, order: 12, visible: 1, children:[], menu: 'more' },
] as const;

export type MenuRoutes = typeof MenuRoutes;

export const MenuInformacion = [
    { text: TitleScreen.SERVICIOS_ESCOLORES, icon: Icons.ServiciosEscolares, path: AppRoutingPaths.SERVICIOS_ESCOLORES, order: 0, visible: 1 },
    { text: TitleScreen.AYUDA, icon: Icons.Ayuda, path: AppRoutingPaths.AYUDA_INTERIOR, order: 1, visible: 1 },
    { text: TitleScreen.CONTACTO, icon: Icons.Contacto, path: AppRoutingPaths.CONTACTO, order: 2, visible: 1 },
    { text: TitleScreen.FAQS, icon: Icons.PreguntasFrecuentes, path: AppRoutingPaths.PREGUNTAS_FRECUENTES_INT, order: 3, visible: 1 },
    { text: TitleScreen.MANUAL_INDUCCION, icon: Icons.ManualInduccion, path: AppRoutingPaths.MANUAL_INDUCCION, order: 4, visible: 1 },
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
    menu: 'main' | 'more';
    hasCount?: boolean;
}

export interface Child {
    text: string;
    path: string;
}