export const LOGIN_ENDPOINTS = {
    POST_AUTH: { path: '/auth' },
    POST_LOGIN: { path: '/auth/login' },
    POST_LOGOUT: { path: '/auth/logout' }
}

export const NOTIFICATIONS_ENDPOINTS = {
    GET_NOTIFICATIONS: { path: '/notificaciones', key: 'notificaciones' }
}

export const PERFIL_ENDPOINTS = {
    GET_PERFIL: { path: '/perfil', key: 'perfil' },
    POST_PERFIL: { path: '/actualizar', key: 'actualizar' }
}

export const PLAN_ESTUDIO_ENDPOINTS = {
    GET_MATERIAS: { path:'/plan-estudios', key: 'materias' },
    GET_INFORMACION_MATERIAS: { path:'/plan-estudios/cursos/informacion', key: 'informacion' },
}

export const CURSOS_ACTIVOS_ENDPOINTS = {
    GET_MATERIAS: { path:'/cursos-activos', key: 'cursos-act-materias' },
    GET_CURSOS_CONTENIDO_BY_ID: { path:'/cursos-activos/contenido', key: 'cursos-contenido-id' },
    GET_MAPA_CURRICULAR: { path:'/cursos-activos/mapa-curricular', key: 'cursos-act-mapa-curricular' },
    POST_AUTH: { path: '/cursos-activos/auth' }
}

export const CALENDARIO_ENDPOINTS = {
    GET_CALENDARIO: { path:'/calendario', key: 'calendario' },
}

export const CALIFICACIONES_ENDPOINTS = {
    GET_CALIFICACIONES: { path:'/calificaciones', key: 'calificaciones' },
}

export const MAS_INFORMACION_ENDPOINTS = {
    GET_SERVICIOS_ESCOLARES: { path:'/serviciosescolares', key: 'servicios-escolares' },
    GET_CONTACTO: { path:'/mas-informacion/contacto', key: 'contacto' },
    GET_LINEAMIENTOS: { path:'/mas-informacion/lineamientos', key: 'lineamientos' },
    GET_MANUAL_INDUCCION: { path:'/mas-informacion/manual-induccion', key: 'manual-induccion' },
}

export const FAQS_ENDPOINTS = {
    GET_FAQS: { path:'/preguntas-frecuentes', key: 'preguntas-frecuentes' },
}

export const CONTACTO_ENDPOINTS = {
    GET_CONTACTO: { path:'/contacto', key: 'contacto' },
}

export const AYUDA_ENDPOINTS = {
    POST_AYUDA: { path:'/tickets-ayuda' },
    POST_AYUDA_ALUMNOS: { path:'/tickets-ayuda/alumnos' },
    POST_AYUDA_TUTOR: { path:'/tickets-ayuda/tutor' },
    GET_AYUDA: { path:'/tickets-ayuda', key: 'tickets' },
    GET_MATERIAS: { path:'/tickets-ayuda/materias', key: 'materias' },
    GET_TUTORES: { path:'/tickets-ayuda/tutores', key: 'tutores' },
    GET_ASUNTOS_TEMAS: { path:'/tickets-ayuda/temas-ayuda', key: 'temas-ayuda' },
}

export const MANUALES_ENDPOINTS = {
    GET_MANUALES: { path: '/documentos', key: 'manuales' }
}

export const BIBLIOTECA_ENDPOINTS = {
    GET_BIBLIOTECA: { path: '/modulos-campus/detalle', key: 'biblioteca' },
    GET_BIBLIOTECA_BY_ID: { path: '/modulos-campus/submodulos', key: 'biblioteca_by_id' },
    GET_LISTADO_VIDEOTECA: { path: '/biblioteca', key: 'listado-videoteca' },
}