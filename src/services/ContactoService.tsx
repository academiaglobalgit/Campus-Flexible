import { useQuery } from "@tanstack/react-query";
import type { Contacto, ContactoResponse } from "../types/contacto.interface";
import { CONTACTO_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import React from "react";

export const useGetContacto = (id_plan_estudios: number) => {
    const query = useQuery<ContactoResponse, Error>({
        queryKey: [CONTACTO_ENDPOINTS.GET_CONTACTO.key, id_plan_estudios],
        queryFn: async () => await apiClient.get<ContactoResponse>(`${CONTACTO_ENDPOINTS.GET_CONTACTO.path}?id_plan_estudios=${id_plan_estudios}`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });

    const mapData = (data: Contacto[]) => {
        return {
            telefono: data.filter((item) => item.type === "telefono").map((item) => item.contacto), 
            email: data.filter((item) => item.type === "email").map((item) => item.contacto)
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