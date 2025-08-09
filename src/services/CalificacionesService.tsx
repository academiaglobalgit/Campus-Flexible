import { useQuery } from "@tanstack/react-query";
import type { CalificacionCurso, CalificacionDetalleResponse, CalificacionesResponse } from "../types/Calificaciones.interface";
import { apiClient } from "./ApiConfiguration/httpClient";
import { CALIFICACIONES_ENDPOINTS } from "../types/endpoints";

export const useGetCalificaciones = () => {
  return useQuery({
    queryKey: [CALIFICACIONES_ENDPOINTS.GET_CALIFICACIONES.key],
    queryFn: async () => {
      const res = await apiClient.get<CalificacionesResponse>(
        CALIFICACIONES_ENDPOINTS.GET_CALIFICACIONES.path
      );

      const cursos = res.data.cursos ?? [];

      const rows = Object.values(
        cursos.reduce((acc, curso) => {
          const periodoKey = curso.periodo;
          if (!acc[periodoKey]) {
            acc[periodoKey] = {
              id: Number(periodoKey) - 1,
              periodo: periodoKey,
              cursos: [],
            };
          }
          acc[periodoKey].cursos.push(curso);
          return acc;
        }, {} as Record<number, { id: number; periodo: number; cursos: CalificacionCurso[] }>)
      );

      return {
        cursos: rows,
        promedio_general: res.data.promedio_general || "0",
        glosario: res.data.glosario || [],
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

export const useGetCalificacionesDetalles = (cursoId: number) => {
  return useQuery<CalificacionDetalleResponse, Error>({
      queryKey: [CALIFICACIONES_ENDPOINTS.GET_CALIFICACIONES_DETALLES.key, cursoId],
      queryFn: async () => await apiClient.get<CalificacionDetalleResponse>(`${CALIFICACIONES_ENDPOINTS.GET_CALIFICACIONES_DETALLES.path}?id_curso=${cursoId}`),
      staleTime: 1000 * 60 * 5, // 5 minutos de stale time
  });
}