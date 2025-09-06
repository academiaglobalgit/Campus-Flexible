import { useQuery } from '@tanstack/react-query';
import { apiClient } from './ApiConfiguration/httpClient';
import { FAQS_ENDPOINTS } from '../types/endpoints';
import type { PreguntasFrecuentesResponse, Pregunta } from '../types/preguntas-frecuentes.interface';
import React from 'react';

type FaqsGroup = {
    [group: string]: Pregunta[];
};

export const useGetPreguntasFrecuentes = (id_plan_estudios: number) => {
    const query = useQuery<PreguntasFrecuentesResponse, Error>({
        queryKey: [FAQS_ENDPOINTS.GET_FAQS.key, id_plan_estudios],
        queryFn: async () => await apiClient.get(`${FAQS_ENDPOINTS.GET_FAQS.path}?id_plan_estudio=${id_plan_estudios}`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
        enabled: id_plan_estudios !== undefined && id_plan_estudios !== null && id_plan_estudios > 0,
    });

    const mapData = (data: Pregunta[]) => {
        const faqs = data.reduce((acc: FaqsGroup, pregunta: Pregunta) => {
            if (!acc[pregunta.nombre_seccion]) {
                acc[pregunta.nombre_seccion] = [];
            }
            acc[pregunta.nombre_seccion].push(pregunta);
            return acc;
        }, {});

        return faqs;
    }

    return {
        ...query,
        data: React.useMemo(
            () => mapData(query.data?.data ?? []),
            [query.data]
        )
    }
};