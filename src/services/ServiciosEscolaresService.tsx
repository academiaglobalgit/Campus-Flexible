import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MAS_INFORMACION_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { ServiciosEscolares, ServiciosEscolaresResponse } from "@constants";
import type { ServicioSeccion } from "../types/ServiciosEscolares.interface";


export const useGetServiciosEscolares = () => {
    const query = useQuery<ServiciosEscolaresResponse, Error>({
         queryKey: [MAS_INFORMACION_ENDPOINTS.GET_SERVICIOS_ESCOLARES.key],
         queryFn: async () => await apiClient.get<ServiciosEscolaresResponse>(`${MAS_INFORMACION_ENDPOINTS.GET_SERVICIOS_ESCOLARES.path}`),
         staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });

    const mapData = (data: ServiciosEscolares[]) => {
        const serviciosPorSeccion = data.reduce<Record<string, ServiciosEscolares[]>>((acc, item) => {
            if (!acc[item.nombre_seccion]) {
                acc[item.nombre_seccion] = [];
            }

            acc[item.nombre_seccion].push(item);
            return acc;
        }, {});        

        
        const secciones: ServicioSeccion[] = Object.entries(serviciosPorSeccion).map(([nombre_seccion, servicios]) => ({
            nombre_seccion,
            imagen: servicios[0].imagen,
            servicios: servicios.map(servicio => ({
                id: servicio.id_servicio_escolar,
                nombre: servicio.nombre_servicio,
                descripcion: servicio.descripcion,
                precio: servicio.precio,
                imagen: servicio.imagen,
            })),
        }));
                
        return secciones;
    };

    return {
        ...query,
        data: React.useMemo(
            () => mapData(query.data?.data ?? []),
            [query.data]
        ),
        // refetchMapeado: async () => {
        //     const result = await query.refetch();
        //     return mapData(result.data?.data ?? []);
        // }
    }
    
}