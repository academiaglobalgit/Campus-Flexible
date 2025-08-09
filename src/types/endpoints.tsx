export const LOGIN_ENDPOINTS = {
    POST_AUTH: { path: '/auth' },
    POST_LOGIN: { path: '/auth/login' },
    POST_LOGOUT: { path: '/auth/logout' },
    POST_NEW_PASSWORD: { path: '/auth/complete-new-password' },
}

export const NOTIFICATIONS_ENDPOINTS = {
    GET_NOTIFICATIONS: { path: '/notificaciones', key: 'notificaciones' },
    POST_NOTIFICATIONS: { path: '/notificaciones/read' },
    POST_READ_ALL_NOTIFICATIONS: { path: '/notificaciones/read-all' }
}

export const PERFIL_ENDPOINTS = {
    GET_PERFIL: { path: '/perfil', key: 'perfil' },
    POST_PERFIL: { path: '/actualizar', key: 'actualizar' }
}

export const PLAN_ESTUDIO_ENDPOINTS = {
    GET_MATERIAS: { path: '/plan-estudios', key: 'materias' },
    GET_INFORMACION_MATERIAS: { path: '/plan-estudios/cursos/informacion', key: 'informacion' },
    POST_CARGAR_CURSO: { path: '/plan-estudios/cargar-curso' }
}

export const CURSOS_ACTIVOS_ENDPOINTS = {
    GET_MATERIAS: { path:'/cursos-activos', key: 'cursos-act-materias' },
    GET_CURSOS_CONTENIDO_BY_ID: { path:'/cursos-activos/contenido', key: 'cursos-contenido-id' },
    GET_MAPA_CURRICULAR: { path:'/cursos-activos/mapa-curricular', key: 'cursos-act-mapa-curricular' },
    GET_LISTA_PROGRESO: { path:'/cursos-activos/lista-progreso', key: 'lista-progreso' },
    POST_ACTIVIDADES: { path: '/cursos-activos/actividades/guardar' }
}

export const CALENDARIO_ENDPOINTS = {
    GET_CALENDARIO: { path: '/calendario', key: 'calendario' },
}

export const CALIFICACIONES_ENDPOINTS = {
    GET_CALIFICACIONES: { path: '/calificaciones', key: 'calificaciones' },
    GET_CALIFICACIONES_DETALLES: { path: '/calificaciones/curso/detalle', key: 'calificaciones_detalle' },
}

export const MAS_INFORMACION_ENDPOINTS = {
    GET_SERVICIOS_ESCOLARES: { path: '/mas-informacion/servicios-escolares', key: 'servicios-escolares' },
    GET_CONTACTO: { path: '/mas-informacion/contacto', key: 'contacto' },
    GET_LINEAMIENTOS: { path: '/mas-informacion/lineamientos', key: 'lineamientos' },
    GET_MANUAL_INDUCCION: { path: '/mas-informacion/manual-induccion', key: 'manual-induccion' },
}

export const FAQS_ENDPOINTS = {
    GET_FAQS: { path: '/preguntas-frecuentes', key: 'preguntas-frecuentes' },
}

export const CONTACTO_ENDPOINTS = {
    GET_CONTACTO: { path: '/contacto', key: 'contacto' },
    GET_CONTACTO_INTERNO: { path: '/contacto', key: 'contacto-interno' },
}

export const AYUDA_ENDPOINTS = {
    POST_AYUDA: { path: '/tickets-ayuda' },
    POST_AYUDA_ALUMNOS: { path: '/tickets-ayuda/alumnos' },
    POST_AYUDA_TUTOR: { path: '/tickets-ayuda/tutor' },
    GET_AYUDA: { path: '/tickets-ayuda', key: 'tickets' },
    GET_MATERIAS: { path: '/tickets-ayuda/materias', key: 'materias' },
    GET_TUTORES: { path: '/tickets-ayuda/tutores', key: 'tutores' },
    GET_ASUNTOS_TEMAS: { path: '/tickets-ayuda/temas-ayuda', key: 'temas-ayuda' },
}

export const MANUALES_ENDPOINTS = {
    GET_MANUALES: { path: '/documentos', key: 'manuales' },
    GET_MANUALES_USUARIO: { path: '/mas-informacion/manuales-usuario', key: 'manuales-usuario' },
    GET_LINEAMIENTOS_USUARIO: { path: '/mas-informacion/lineamientos', key: 'lineamientos-usuario' }
}

export const BIBLIOTECA_ENDPOINTS = {
    GET_BIBLIOTECA: { path: '/modulos-campus/detalle', key: 'biblioteca' },
    GET_BIBLIOTECA_BY_ID: { path: '/modulos-campus/submodulos', key: 'biblioteca_by_id' },
    GET_LISTADO_VIDEOTECA: { path: '/biblioteca', key: 'listado-videoteca' },
}

export const SALA_CONVERSACION = {
    GET_SALA_CONVERSACION: { path: '/sala-conversacion', key: 'get-id-conversacion' },
    GET_MENSAJES: { path: '/sala-conversacion/mensajes', key: 'sala-conversacion' },
    SET_MENSAJES: { path: 'sala-conversacion/mensajes/guardar', key: 'sala-conversacion-guardar' },
    DELETE_MENSAJES: { path: '/sala-conversacion/mensajes/eliminar', key: 'sala-conversacion-eliminar' },
    GET_TEMA_FORO_BY_ID: { path: '/sala-conversacion', key: 'tema-foro-by-id' },
}

export const CONSEJERIA_ESTUDIANTIL = {
    GET_MOTIVOS: {path: '/consejeria-estudiantil/citas/motivos', key: 'consejeria-motivos'},
    POST_AGENDR_CITA: {path: '/consejeria-estudiantil/citas/guardar'}
}

export const TERMINOS_CONDICIONES = {
    POST_TERMINOS: {path: '/documentos/tyc/aceptar'}
}