import React from "react";
import { useQuery } from "@tanstack/react-query";
import type { Contacto, ContactoResponse, ContactoInternoResponse, ContactoInterno, ContactoData } from "../types/contacto.interface";
import { CONTACTO_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import { formatWithIMask } from "../utils/Helpers";

export const useGetContacto = (id_plan_estudios: number) => {
    const query = useQuery<ContactoResponse, Error>({
        queryKey: [CONTACTO_ENDPOINTS.GET_CONTACTO.key, id_plan_estudios],
        queryFn: async () => await apiClient.get<ContactoResponse>(`${CONTACTO_ENDPOINTS.GET_CONTACTO.path}?id_plan_estudio=${id_plan_estudios}&principal=1`),
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

        const transformedData = Object.values(
            data.reduce<Record<number, ContactoData>>((acc, currentItem) => {
                const { id_seccion_contacto, nombre_seccion, descripcion_seccion, id_tipo_contacto, valor_contacto } = currentItem;

                if (!acc[id_seccion_contacto]) {
                    acc[id_seccion_contacto] = {
                        label: nombre_seccion,
                        imgSrc: '',
                        valor: id_seccion_contacto,
                        data: {
                            description: descripcion_seccion,
                            horarios: null,
                            telefonos: null,
                            email: null,
                        },
                    };
                }

                switch (id_tipo_contacto) {
                    case 1:
                        acc[id_seccion_contacto].data.telefonos = formatWithIMask(valor_contacto, 'phone'); 
                        break;
                    case 2:
                        acc[id_seccion_contacto].data.email = valor_contacto;
                        break;
                    case 3:
                        acc[id_seccion_contacto].data.horarios = valor_contacto;
                        break;
                    default:
                        // Handle other types if necessary
                        break;
                }

                return acc;
            }, {})
        );

        return transformedData;
    };

    return {
        ...query,
        data: React.useMemo(
            () => mapData(query.data?.data ?? []),
            [query.data?.data]
        )
    };

}

