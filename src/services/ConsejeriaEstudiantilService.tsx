import React from "react";
import type { MotivosCita, MotivosCitaResponse } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { CONSEJERIA_ESTUDIANTIL } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";

export const useCreateCita = async (payload: {id_motivo: number, mensaje: string}): Promise<any> => {
    
    const encryptedPayload = await apiClient.encryptData({...payload});
    return await apiClient.post<any>(CONSEJERIA_ESTUDIANTIL.POST_AGENDR_CITA.path, { data: encryptedPayload });
};

export const useGetMotivos = () => {
    const query = useQuery<MotivosCitaResponse, Error>({
         queryKey: [CONSEJERIA_ESTUDIANTIL.GET_MOTIVOS.key],
         queryFn: async () => await apiClient.get<MotivosCitaResponse>(`${CONSEJERIA_ESTUDIANTIL.GET_MOTIVOS.path}`),
         staleTime: 1000 * 60 * 5, // 5 minutos de stale time
     });

     const mapData = (data: MotivosCita[]) => {
        const res = [...data, {id_motivo: 0, nombre_motivo: 'Seleccionar Motivo'}].sort((a, b) => a.id_motivo - b.id_motivo);
        return res;
    }

    return {
        ...query,
        data: React.useMemo(
            () => mapData(query.data?.data ?? []),
            [query.data]
        )
    }
}