import React from "react";
import { useQuery } from "@tanstack/react-query";
import type { Contacto, ContactoResponse, ContactoInternoResponse, ContactoInterno } from "../types/contacto.interface";
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

export const useContactoInterno = (id_plan_estudios: number) => {
    const query = useQuery<ContactoInternoResponse, Error>({
        queryKey: [CONTACTO_ENDPOINTS.GET_CONTACTO_INTERNO.key],
        queryFn: async () => await apiClient.get<ContactoInternoResponse>(`${CONTACTO_ENDPOINTS.GET_CONTACTO_INTERNO.path}?id_plan_estudio=${id_plan_estudios}&principal=0`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });

    const mapData = (data: ContactoInterno[]) => {
        const seccionesMap = new Map<string, {
            label: string;
            imgSrc: string;
            valor: number | null;
            data: {
                description: string;
                horarios: string | null;
                telefonos: string | null;
                email: string | null;
            };
        }>();

        data.forEach((item) => {
            if (!seccionesMap.has(item.nombre_seccion)) {
                seccionesMap.set(item.nombre_seccion, {
                    label: item.nombre_seccion,
                    imgSrc: item.nombre_seccion,
                    valor: item.id_seccion_contacto,
                    data: {
                        description: item.descripcion_seccion,
                        horarios: null,
                        telefonos: null,
                        email: null,
                    },
                });
            }

            const seccion = seccionesMap.get(item.nombre_seccion)!;

            switch (item.id_tipo_contacto) {
                case 1:
                    seccion.data.telefonos = seccion.data.telefonos
                        ? `${seccion.data.telefonos}/${item.valor_contacto}`
                        : item.valor_contacto;
                    break;
                case 2:
                    seccion.data.email = item.valor_contacto;
                    break;
                case 3:
                    seccion.data.horarios = item.valor_contacto;
                    break;
            }
        });

        return Array.from(seccionesMap.values());
    };
    return {
        ...query,
        data: React.useMemo(
            () => mapData(query.data?.data ?? []),
            [query.data?.data]
        )
    };

}

