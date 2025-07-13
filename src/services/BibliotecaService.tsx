import React from "react";
import { useQuery } from "@tanstack/react-query";
import type { BibliotecaResponse, BibliotecaVideotecaResponse, ListadoVideoteca, ListadoVideotecaResponse } from "../types/BibliotecaVideoteca.interface";
import { BIBLIOTECA_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";

export const useGetBiblioteca = () => {
     return useQuery<BibliotecaResponse, Error>({
         queryKey: [BIBLIOTECA_ENDPOINTS.GET_BIBLIOTECA.key],
         queryFn: async () => await apiClient.get<BibliotecaResponse>(`${BIBLIOTECA_ENDPOINTS.GET_BIBLIOTECA.path}?id_modulo_campus=5`),
         staleTime: 1000 * 60 * 5, // 5 minutos de stale time
     });
}

export const useGetBibliotecaById = (id: number | undefined, options?: { enabled?: boolean }) => {
  return useQuery<BibliotecaVideotecaResponse, Error>({
    queryKey: [BIBLIOTECA_ENDPOINTS.GET_BIBLIOTECA_BY_ID.key, id],
    enabled: options?.enabled ?? !!id,
    queryFn: async () =>
      await apiClient.get<BibliotecaVideotecaResponse>(
        `${BIBLIOTECA_ENDPOINTS.GET_BIBLIOTECA_BY_ID.path}?id_modulo_padre=${id}`
      ),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetListadoVideoteca = () => {
     const query = useQuery<ListadoVideotecaResponse, Error>({
         queryKey: [BIBLIOTECA_ENDPOINTS.GET_LISTADO_VIDEOTECA.key],
         queryFn: async () => await apiClient.get<ListadoVideotecaResponse>(`${BIBLIOTECA_ENDPOINTS.GET_LISTADO_VIDEOTECA.path}`),
         staleTime: 1000 * 60 * 5, // 5 minutos de stale time
     });

    const mapData = (data: ListadoVideoteca[]) => {

//         data = [
//           {
//             periodo: 1,
//             id_curso: 1,
//             nombre_curso: "Materia 1",
//             id_recurso: 1,
//             titulo: "Manual de Inducción",
//             descripcion: "Documento introductorio con normas y estructura académica.",
//             url_recurso: "https://cdn.plataforma.com/docs/manual-induccion.pdf",
//             orden: 1,
//             id_tipo_recurso: 1,
//           },
//           {
//             periodo: 1,
//             id_curso: 1,
//             nombre_curso: "Materia 1",
//             id_recurso: 2,
//             titulo: "Video de Bienvenida",
//             descripcion: "Mensaje de bienvenida del coordinador académico.",
//             url_recurso: "https://cdn.plataforma.com/videos/bienvenida.mp4",
//             orden: 2,
//             id_tipo_recurso: 2,
//           },
//           {
//             periodo: 1,
//             id_curso: 2,
//             nombre_curso: "Materia 2",
//             id_recurso: 3,
//             titulo: "Video de Bienvenida",
//             descripcion: "Mensaje de bienvenida del coordinador académico.",
//             url_recurso: "https://cdn.plataforma.com/videos/bienvenida.mp4",
//             orden: 2,
//             id_tipo_recurso: 2,
//           },
//           {
//             periodo: 1,
//             id_curso: 2,
//             nombre_curso: "Materia 2",
//             id_recurso: 4,
//             titulo: "Video de Bienvenida",
//             descripcion: "Mensaje de bienvenida del coordinador académico.",
//             url_recurso: "https://cdn.plataforma.com/videos/bienvenida.mp4",
//             orden: 2,
//             id_tipo_recurso: 2,
//           },
//           {
//             periodo: 2,
//             id_curso: 3,
//             nombre_curso: "Materia 3",
//             id_recurso: 3,
//             titulo: "Video de Bienvenida",
//             descripcion: "Mensaje de bienvenida del coordinador académico.",
//             url_recurso: "https://cdn.plataforma.com/videos/bienvenida.mp4",
//             orden: 2,
//             id_tipo_recurso: 2,
//           },
//           {
//             periodo: 2,
//             id_curso: 4,
//             nombre_curso: "Materia 4",
//             id_recurso: 4,
//             titulo: "Video de Bienvenida",
//             descripcion: "Mensaje de bienvenida del coordinador académico.",
//             url_recurso: "https://cdn.plataforma.com/videos/bienvenida.mp4",
//             orden: 2,
//             id_tipo_recurso: 2,
//           },
//           {
//             periodo: 3,
//             id_curso: 5,
//             nombre_curso: "Materia 5",
//             id_recurso: 4,
//             titulo: "Video de Bienvenida",
//             descripcion: "Mensaje de bienvenida del coordinador académico.",
//             url_recurso: "https://cdn.plataforma.com/videos/bienvenida.mp4",
//             orden: 2,
//             id_tipo_recurso: 2,
//           }
// ];

        const periodos = Array.from(new Set(data.map(item => item.periodo))).sort((a, b) => a - b);
        
        const groupedByCurso = data.reduce<{ id_periodo: number, id_curso: number, nombre_curso: string, recursos: ListadoVideoteca[] }[]>((acc, item) => {
          const existingCurso = acc.find(c => c.id_curso === item.id_curso);
          if (existingCurso) {
            existingCurso.recursos.push(item);
          } else {
            acc.push({
              id_periodo: item.periodo,
              id_curso: item.id_curso,
              nombre_curso: item.nombre_curso,
              recursos: [item]
            });
          }
          return acc;
        }, []);

        return {
          periodos,
          materias: groupedByCurso
        }
    }

    return {
        ...query,
        data: React.useMemo(
            () => mapData(query.data?.data ?? []),
            [query.data]
        )
    }

}