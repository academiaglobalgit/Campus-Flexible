import { useQuery } from "@tanstack/react-query";
import type { ManualesResponse } from "../types/manuales.interface";
import { MANUALES_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import { TipoManuales } from '../types/tipoManuales';


export const useGetManuales = (nombre_tipo: string, id_plan_estudios: number) => {

    const tipoInduccion = TipoManuales.find(
        (tipo) => tipo.nombre_tipo === nombre_tipo
    );

    const idInduccion = tipoInduccion?.id_tipo_manual;

    return useQuery<ManualesResponse, Error>({
        queryKey: [MANUALES_ENDPOINTS.GET_MANUALES.key, idInduccion],
        queryFn: async () => await apiClient.get<ManualesResponse>(`${MANUALES_ENDPOINTS.GET_MANUALES.path}?tipo=${idInduccion}&id_plan_estudio=${id_plan_estudios}`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });

}