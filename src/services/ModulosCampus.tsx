import { apiClient } from "./ApiConfiguration/httpClient";
import type { ModulosDatosResponse } from "../types/modulosCampus";
import { MODULOS_CAMPUS } from "../types/endpoints";
import { useQuery } from "@tanstack/react-query";


export const useGetDatosModulos = (idModulo: number) => {
    return useQuery<ModulosDatosResponse, Error>({
        queryKey: [MODULOS_CAMPUS.GET_DATOS_MODULOS.key, idModulo],
        queryFn: async () => await apiClient.get<ModulosDatosResponse>(`${MODULOS_CAMPUS.GET_DATOS_MODULOS.path}?id_modulo_campus=${idModulo}`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
}