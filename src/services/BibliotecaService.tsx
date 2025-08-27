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

    /*     const dataprueba = [
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
                "tipo_recurso": "Audio",
                "descripcion": "<iframe src=\"https://player.vimeo.com/video/683479928?h=ebad425d01&amp;badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479\" width=\"600\" height=\"336\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" title=\"GENITIVO SAJÓN, ADJETIVOS Y PRONOMBRES POSESIVOS CURSO BÁSICO DE INGLÉS DESDE CERO.mp4\"></iframe>",
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
                "tipo_recurso": "Lectura",
                "descripcion": "<iframe src=\"https://player.vimeo.com/video/683479928?h=ebad425d01&amp;badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479\" width=\"600\" height=\"336\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" title=\"GENITIVO SAJÓN, ADJETIVOS Y PRONOMBRES POSESIVOS CURSO BÁSICO DE INGLÉS DESDE CERO.mp4\"></iframe>",
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
                "tipo_recurso": "Video Vimeo",
                "descripcion": "<iframe src=\"https://player.vimeo.com/video/683479928?h=ebad425d01&amp;badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479\" width=\"600\" height=\"336\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" title=\"GENITIVO SAJÓN, ADJETIVOS Y PRONOMBRES POSESIVOS CURSO BÁSICO DE INGLÉS DESDE CERO.mp4\"></iframe>",
              },
    
            ]
          },
          {
            "id_grupo": 17,
            "seccion": "Periodo 2",
            "parent_id": null,
            "orden_seccion": 1,
            "tipo_seccion": "PERIODO",
            "recursos": []
          },
          {
            "id_grupo": 40,
            "seccion": "Fundamentos de Contabilidad",
            "parent_id": 17,
            "orden_seccion": 2,
            "tipo_seccion": "SECCION",
            "recursos": [
              {
                "id_recurso": 56,
                "titulo": "COMPUTACIÓN Unidad 1 Componentes de una Computadora",
                "url_recurso": "https://vimeo.com/776262386/6a062762cd",
                "id_grupo": 17,
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
                "id_grupo": 17,
                "id_curso": null,
                "curso": null,
                "periodo": null,
                "id_tipo_recurso": 4,
                "tipo_recurso": "Audio",
                "descripcion": "<iframe src=\"https://player.vimeo.com/video/683479928?h=ebad425d01&amp;badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479\" width=\"600\" height=\"336\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" title=\"GENITIVO SAJÓN, ADJETIVOS Y PRONOMBRES POSESIVOS CURSO BÁSICO DE INGLÉS DESDE CERO.mp4\"></iframe>",
              },
              {
                "id_recurso": 56,
                "titulo": "COMPUTACIÓN Unidad 1 Componentes de una Computadora",
                "url_recurso": "https://vimeo.com/776262386/6a062762cd",
                "id_grupo": 17,
                "id_curso": null,
                "curso": null,
                "periodo": null,
                "id_tipo_recurso": 4,
                "tipo_recurso": "Lectura",
                "descripcion": "<iframe src=\"https://player.vimeo.com/video/683479928?h=ebad425d01&amp;badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479\" width=\"600\" height=\"336\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" title=\"GENITIVO SAJÓN, ADJETIVOS Y PRONOMBRES POSESIVOS CURSO BÁSICO DE INGLÉS DESDE CERO.mp4\"></iframe>",
              },
    
            ]
          },
          {
            "id_grupo": 27,
            "seccion": "Fundamentos de Contabilidad 2",
            "parent_id": 17,
            "orden_seccion": 2,
            "tipo_seccion": "SECCION",
            "recursos": [
              {
                "id_recurso": 56,
                "titulo": "COMPUTACIÓN Unidad 1 Componentes de una Computadora",
                "url_recurso": "https://vimeo.com/776262386/6a062762cd",
                "id_grupo": 17,
                "id_curso": null,
                "curso": null,
                "periodo": null,
                "id_tipo_recurso": 4,
                "tipo_recurso": "Video Vimeo",
                "descripcion": "<iframe src=\"https://player.vimeo.com/video/683479928?h=ebad425d01&amp;badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479\" width=\"600\" height=\"336\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" title=\"GENITIVO SAJÓN, ADJETIVOS Y PRONOMBRES POSESIVOS CURSO BÁSICO DE INGLÉS DESDE CERO.mp4\"></iframe>",
              },
    
            ]
          },
          {
            "id_grupo": 61,
            "seccion": "Propedéuticos Inglés ",
            "parent_id": null,
            "orden_seccion": 10,
            "tipo_seccion": "SECCION",
            "recursos": [
              {
                "id_recurso": 9,
                "titulo": "Video #1 Curso Básico de Inglés desde Cero. Genitivo Sajón, Adjetivos y Pronombres Posesivos",
                "url_recurso": "https://vimeo.com/683479928/ebad425d01",
                "descripcion": "<iframe src=\"https://player.vimeo.com/video/683479928?h=ebad425d01&amp;badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479\" width=\"600\" height=\"336\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" title=\"GENITIVO SAJÓN, ADJETIVOS Y PRONOMBRES POSESIVOS CURSO BÁSICO DE INGLÉS DESDE CERO.mp4\"></iframe>",
                "id_grupo": 61,
                "id_curso": null,
                "curso": null,
                "periodo": null,
                "id_tipo_recurso": 4,
                "tipo_recurso": "Video Vimeo"
              },
              {
                "id_recurso": 9,
                "titulo": "Video #1 Curso Básico de Inglés desde Cero. Genitivo Sajón, Adjetivos y Pronombres Posesivos",
                "url_recurso": "https://vimeo.com/683479928/ebad425d01",
                "descripcion": "<iframe src=\"https://player.vimeo.com/video/683479928?h=ebad425d01&amp;badge=0&amp;autopause=0&amp;quality_selector=1&amp;player_id=0&amp;app_id=58479\" width=\"600\" height=\"336\" frameborder=\"0\" allow=\"autoplay; fullscreen; picture-in-picture\" title=\"GENITIVO SAJÓN, ADJETIVOS Y PRONOMBRES POSESIVOS CURSO BÁSICO DE INGLÉS DESDE CERO.mp4\"></iframe>",
                "id_grupo": 61,
                "id_curso": null,
                "curso": null,
                "periodo": null,
                "id_tipo_recurso": 4,
                "tipo_recurso": "Video Vimeo"
              },
            ]
          }
    
        ]
     */
    const periodos = data
      .filter(item => item.parent_id === null)
      .map(item => {
        const match = item.seccion.match(/Periodo\s+(\d+)/i);
        return {
          periodo: match ? Number(match[1]) : item.id_grupo,
          seccion: item.seccion,
          tipo_seccion: item.tipo_seccion,
        };
      })
      .sort((a, b) => a.periodo - b.periodo);

    const groupedByCurso = data.reduce<
      {
        tipo_seccion: string; periodo: number; seccion: string; grupos: ListadoVideotecaRecursos[][]
      }[]
    >((acc, item) => {
      // Caso 1: Periodo raíz
      if (item.tipo_seccion === "PERIODO" && item.parent_id === null) {
        const match = item.seccion.match(/Periodo\s+(\d+)/i);
        const periodo = match ? Number(match[1]) : item.id_grupo;
        const hijos = data.filter(h => h.parent_id === item.id_grupo);

        hijos.forEach(hijo => {
          acc.push({
            periodo,
            seccion: hijo.seccion,
            tipo_seccion: item.tipo_seccion,
            grupos: [hijo.recursos],
          });
        });
      }

      // Caso 2: Sección con recursos propios
      if (item.tipo_seccion === "SECCION" && item.recursos.length > 0) {
        item.recursos.forEach(recurso => {
          acc.push({
            periodo: recurso.id_grupo,
            seccion: item.seccion,
            tipo_seccion: item.tipo_seccion,
            grupos: [[recurso]],
          });
        });
      }

      // Caso : Cursos con recursos propios
      if (item.tipo_seccion === "CURSO" && item.recursos.length > 0) {
        item.recursos.forEach(recurso => {
          acc.push({
            periodo: recurso.id_grupo,
            seccion: item.seccion,
            tipo_seccion: item.tipo_seccion,
            grupos: [[recurso]],
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