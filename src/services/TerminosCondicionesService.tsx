import { TERMINOS_CONDICIONES } from "../types/endpoints";
import type { TerminosCondiciones } from "../types/TerminosCondiciones.interface";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./ApiConfiguration/httpClient";

export const useTerminos = async (payload: { documentos_legales: number[] }) => {
    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient.post(TERMINOS_CONDICIONES.POST_TERMINOS.path, { data: encryptedPayload });
}

export const useGetTerminosDatos = () => {
    return useQuery<TerminosCondiciones, Error>({
        queryKey: [TERMINOS_CONDICIONES.GET_TERMINOS.key],
        queryFn: async () => await apiClient.get<TerminosCondiciones>(`${TERMINOS_CONDICIONES.GET_TERMINOS.path}`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
}