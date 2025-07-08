export const LOGIN_ENDPOINTS = {
    POST_AUTH: { path: '/auth' },
    POST_LOGIN: { path: '/auth/login' },
    POST_LOGOUT: { path: '/auth/logout' }
}

export const NOTIFICATIONS_ENDPOINTS = {
    GET_NOTIFICATIONS: { path: '/notificaciones', key: 'notificaciones' }
}

export const PERFIL_ENDPOINTS = {
    GET_PERFIL: { path: '/perfil', key: 'perfil' }
}

export const PLAN_ESTUDIO_ENDPOINTS = {
    GET_MATERIAS: { path:'/plan-estudios', key: 'materias' },
}

export const CURSOS_ACTIVOS_ENDPOINTS = {
    GET_MATERIAS: { path:'/cursos-activos/materias', key: 'cursos-act-materias' },
    GET_MATERIAS_BY_ID: { path:'/cursos-activos/materias', key: 'cursos-act-materias-id' },
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
    GET_SERVICIOS_ESCOLARES: { path:'/mas-informacion/servicios-escolares/auth', key: 'servicios-escolares' },
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
    POST_AYUDA: { path:'/ayuda' },
}

export const MANUALES_ENDPOINTS = {
    GET_MANUALES: { path: '/documentos', key: 'manuales' }
}

export const BIBLIOTECA_ENDPOINTS = {
    GET_BIBLIOTECA: { path: '/modulos-campus/detalle', key: 'biblioteca' },
    GET_BIBLIOTECA_BY_ID: { path: '/modulos-campus/submodulos', key: 'biblioteca_by_id' },
}