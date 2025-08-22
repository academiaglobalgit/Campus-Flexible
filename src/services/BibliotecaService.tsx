import React from "react";
import { useQuery } from "@tanstack/react-query";
import type { BibliotecaResponse, BibliotecaVideotecaResponse, ListadoVideoteca, ListadoVideotecaRecursos, ListadoVideotecaResponse } from "../types/BibliotecaVideoteca.interface";
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

    //    const periodos = Array.from(new Set(data.map(item => item.parent_id === null))).sort((a, b) => a - b);

    /* const dataprueba = [
      {
        "id_grupo": 16,
        "seccion": "Periodo 1",
        "parent_id": null,
        "orden_seccion": 1,
        "tipo_seccion": "PERIODO",
        "recursos": []
      },
      {
        "id_grupo": 26,
        "seccion": "Fundamentos de Contabilidad",
        "parent_id": 16,
        "orden_seccion": 2,
        "tipo_seccion": "SECCION",
        "recursos": [
          {
            "id_recurso": 56,
            "titulo": "COMPUTACIÓN Unidad 1 Componentes de una Computadora",
            "url_recurso": "https://vimeo.com/776262386/6a062762cd",
            "id_grupo": 16,
            "id_curso": null,
            "curso": null,
            "periodo": null,
            "id_tipo_recurso": 4,
            "tipo_recurso": "Video Vimeo"
          },
          {
            "id_recurso": 56,
            "titulo": "COMPUTACIÓN Unidad 1 Componentes de una Computadora",
            "url_recurso": "https://vimeo.com/776262386/6a062762cd",
            "id_grupo": 16,
            "id_curso": null,
            "curso": null,
            "periodo": null,
            "id_tipo_recurso": 4,
            "tipo_recurso": "Audio"
          },
          {
            "id_recurso": 56,
            "titulo": "COMPUTACIÓN Unidad 1 Componentes de una Computadora",
            "url_recurso": "https://vimeo.com/776262386/6a062762cd",
            "id_grupo": 16,
            "id_curso": null,
            "curso": null,
            "periodo": null,
            "id_tipo_recurso": 4,
            "tipo_recurso": "Lectura"
          },

        ]
      },
      {
        "id_grupo": 27,
        "seccion": "Fundamentos de Contabilidad 2",
        "parent_id": 16,
        "orden_seccion": 2,
        "tipo_seccion": "SECCION",
        "recursos": [
          {
            "id_recurso": 56,
            "titulo": "COMPUTACIÓN Unidad 1 Componentes de una Computadora",
            "url_recurso": "https://vimeo.com/776262386/6a062762cd",
            "id_grupo": 16,
            "id_curso": null,
            "curso": null,
            "periodo": null,
            "id_tipo_recurso": 4,
            "tipo_recurso": "Video Vimeo"
          },

        ]
      },
    ] */

    const periodos = data
      .filter(item => item.parent_id === null) // solo los root
      .map(item => {
        const match = item.seccion.match(/Periodo\s+(\d+)/i);
        return match ? Number(match[1]) : item.id_grupo;
      })
      .sort((a, b) => a - b);


    const groupedByCurso = data.reduce<
      { periodo: number; seccion: string; grupos: ListadoVideotecaRecursos[][] }[]
    >((acc, item) => {
      if (item.parent_id === null) {
        // Detectar "Periodo X"
        const match = item.seccion.match(/Periodo\s+(\d+)/i);
        const periodo = match ? Number(match[1]) : item.id_grupo;

        // Buscar los hijos de ese periodo
        const hijos = data.filter(h => h.parent_id === item.id_grupo);

        hijos.forEach(hijo => {
          acc.push({
            periodo,
            seccion: hijo.seccion,
            grupos: [hijo.recursos],
          });
        });
      }
      return acc;
    }, []);

    // ordenar periodos por número
    groupedByCurso.sort((a, b) => a.periodo - b.periodo);

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