import { apiClient } from "./ApiConfiguration/httpClient";
import type { PlanEstudio, PlanEstudioResponse } from "../types/plan-estudio.interface";
import { PLAN_ESTUDIO_ENDPOINTS } from "../types/endpoints";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useGetPlanEstudio = (id_plan_estudio: number) => {
     const query =  useQuery<PlanEstudioResponse, Error>({
         queryKey: [PLAN_ESTUDIO_ENDPOINTS.GET_MATERIAS.key, id_plan_estudio],
         queryFn: async () => await apiClient.get<PlanEstudioResponse>(`${PLAN_ESTUDIO_ENDPOINTS.GET_MATERIAS.path}?id_plan_estudio=${id_plan_estudio}`),
         staleTime: 1000 * 60 * 5, // 5 minutos de stale time
     });


    const mapData = (data: PlanEstudio[]) => {
        const statusMap: Record<number, string> = {
            0: "Inscribirme",
            1: "Finalizada",
            2: "Cursando",
            3: "Inscribirme",
        };

        return Object.values(
            data.reduce((acc, curso) => {
                const periodoKey = curso.periodo;
                const estado_inscripcion = curso.estado_inscripcion || 0;

                if (!acc[periodoKey]) {
                    acc[periodoKey] = {
                        id: periodoKey - 1,
                        periodo: periodoKey,
                        materias: [],
                    };
                }
                acc[periodoKey].materias.push({
                    titulo: curso.nombre_curso,
                    status: statusMap[estado_inscripcion],
                });
                return acc;
            }, {} as Record<number, any>)
        );
    }

    return {
        ...query,
        data: React.useMemo(
            () => mapData(query.data?.data ?? []),
            [query.data]
        )
    }
}