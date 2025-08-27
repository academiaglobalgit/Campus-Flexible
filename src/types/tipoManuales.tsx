export const TipoManualesIds = {
    INDUCCION: 1,
    REGLAMENTO_GENERAL: 3,
    MAPA_CURRICULAR: 5,
    VIDEO_BIENVENIDA: 6,
    CALENDARIO: 7,
    MANUAL_BIBLIOTECA: 8,
    INSTRUMENTO_EVALUACION: 9,
    PORTADA: 10,
    MANUAL_APA: 11,
    ACTIVIDADES_INTEGRATORIAS: 12,
    AVISO_PRIVACIDAD: 12,
    TERMINOS_CONDICIONES: 17,
}

export type TipoManualesIds = typeof TipoManualesIds;

export const TipoManuales = [
    {
        "id_tipo_manual": 1,
        "nombre_tipo": "Inducción",
        "descripcion": "Manuales para la introducción a la plataforma o un programa."
    },
    {
        "id_tipo_manual": 2,
        "nombre_tipo": "Lección",
        "descripcion": "Manuales complementarios o guías de lección."
    },
    {
        "id_tipo_manual": 3,
        "nombre_tipo": "Reglamento",
        "descripcion": "Documentos con las normativas y reglas del campus."
    },
    {
        "id_tipo_manual": 4,
        "nombre_tipo": "Guía de uso",
        "descripcion": "Guías paso a paso para el uso de funcionalidades."
    },
    {
        "id_tipo_manual": 5,
        "nombre_tipo": "Mapa Curricular",
        "descripcion": null
    },
    {
        "id_tipo_manual": 6,
        "nombre_tipo": "Video de Bienvenida",
        "descripcion": null
    },
    {
        "id_tipo_manual": 7,
        "nombre_tipo": "Calendario",
        "descripcion": null
    },
    {
        "id_tipo_manual": 8,
        "nombre_tipo": "Manual Biblioteca",
        "descripcion": null
    }
];

export type TipoManuales = typeof TipoManuales;