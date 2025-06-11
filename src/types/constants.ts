export const AppRoutingPaths = {
    BLANK: "",
    HOME: "/",
    CALENDARIO: "/calendario",
    MIRUTA: "/miruta",
    BIBLIOTECA: "/biblioteca",
    CALIFICACIONES: "/calificaciones",
    LOGIN: "/login",
    ERROR: "/error",
    TODO: "/todo",
    PREGUNTAS_FRECUENTES: "/faqs",
    AYUDA_EXTERIOR: "/help-ext",
    NOTFOUND: '*'
} as const;

export type AppRoutingPaths = typeof AppRoutingPaths;

export const TitleScreen = {
    CALENDARIO: "Calendario",
    PLAN_ESTUDIO: "Plan de estudios",
    PREGUNTAS_FRECUENTES: "Preguntas Frecuentes",
    AYUDA: "Ayuda",
    MI_PERFIL: "Mi Perfil"
}

export type TitleScreen = typeof TitleScreen;

// export const LOGIN_ENDPOINTS = {
//     POST_LOGIN: '/login',
// }

// export type LOGIN_ENDPOINTS = typeof LOGIN_ENDPOINTS;