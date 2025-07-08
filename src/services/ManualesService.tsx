import { useQuery } from "@tanstack/react-query";
import type { ManualesResponse } from "../types/manuales.interface";
import { MANUALES_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import { TipoManuales } from '../types/tipoManuales';


export const useGetManuales = (nombre_tipo: string, type: 'alumnos' | '' = '', id_plan_estudio: number = 0) => {

    const tipoInduccion = TipoManuales.find(
        (tipo) => tipo.nombre_tipo === nombre_tipo
    );

    const idInduccion = tipoInduccion?.id_tipo_manual;

    const url = `${MANUALES_ENDPOINTS.GET_MANUALES.path}${type !== '' ? `/${type}` : ''}?tipo=${idInduccion}${id_plan_estudio > 0 ? `&id_plan_estudio=${id_plan_estudio}` : ''}`;

    return useQuery<ManualesResponse, Error>({
        queryKey: [MANUALES_ENDPOINTS.GET_MANUALES.key, idInduccion],
        queryFn: async () => await apiClient.get<ManualesResponse>(url),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });

}