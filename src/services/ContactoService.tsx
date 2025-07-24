import React from "react";
import { useQuery } from "@tanstack/react-query";
import type { Contacto, ContactoResponse, ContactoInterno } from "../types/contacto.interface";
import { CONTACTO_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import { formatWithIMask } from "../utils/Helpers";

export const useGetContacto = (id_plan_estudios: number) => {
    const query = useQuery<ContactoResponse, Error>({
        queryKey: [CONTACTO_ENDPOINTS.GET_CONTACTO.key, id_plan_estudios],
        queryFn: async () => await apiClient.get<ContactoResponse>(`${CONTACTO_ENDPOINTS.GET_CONTACTO.path}?id_plan_estudio=${id_plan_estudios}`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });

    const mapData = (data: Contacto[]) => {
        return {
            telefono: data.filter((item) => item.id_tipo_contacto === 1).map((item) => formatWithIMask(item.valor_contacto, "phone")),
            email: data.filter((item) => item.id_tipo_contacto === 2).map((item) => item.valor_contacto)
        };
    }

    return {
        ...query,
        data: React.useMemo(
            () => mapData(query.data?.data ?? []),
            [query.data]
        )
    }
}

export const useContactoInterno = () => {
    return useQuery<ContactoInterno, Error>({
        queryKey: [CONTACTO_ENDPOINTS.GET_CONTACTO_INTERNO.key],
        queryFn: async () => await apiClient.get<ContactoInterno>(`${CONTACTO_ENDPOINTS.GET_CONTACTO_INTERNO.path}?id_plan_estudio=${1}&principal=0`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });

}

