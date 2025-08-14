import React from "react";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { PlanEstudio, PlanEstudioInformacionResponse, PlanEstudioMateriasResponse, PlanEstudioResponse } from "../types/plan-estudio.interface";
import { PLAN_ESTUDIO_ENDPOINTS } from "../types/endpoints";
import { useQuery } from "@tanstack/react-query";

import { useGetManuales } from "./ManualesService";
import { useGetDatosModulos } from "./ModulosCampus";

export const useGetPlanEstudio = (options?: { enabled?: boolean }) => {
    const query =  useQuery<PlanEstudioResponse, Error>({
        queryKey: [PLAN_ESTUDIO_ENDPOINTS.GET_MATERIAS.key],
        queryFn: async () => await apiClient.get<PlanEstudioResponse>(`${PLAN_ESTUDIO_ENDPOINTS.GET_MATERIAS.path}`),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
        ...options
    });

    const mapData = (data: PlanEstudio[]): PlanEstudioMateriasResponse[] => {
        // const statusMap: Record<number, string> = {
        //     0: "Inscribirme",
        //     1: "Cursando",
        //     2: "Finalizada",
        //     3: "Inscribirme",
        // };

        const rows = Object.values(
            data.reduce((acc, curso) => {
                const periodoKey = curso.periodo;
                // const estado_inscripcion = curso.id_inscripcion_curso || 0;

                if (!acc[periodoKey]) {
                    acc[periodoKey] = {
                        id: periodoKey - 1,
                        periodo: periodoKey,
                        materias: [],
                    };
                }
                acc[periodoKey].materias.push({
                    id_curso: curso.id_curso,
                    titulo: curso.nombre_curso,
                    status: curso.estatus_curso_alumno === 'No Cursando' ? 'Inscribirme' : curso.estatus_curso_alumno,
                });
                return acc;
            }, {} as Record<number, any>)
        );
        
        return rows;
    }

    return {
        ...query,
        data: React.useMemo(() => mapData(query.data?.data ?? []), [query.data]),
        refetchMapeado: React.useCallback(async () => {
            const result = await query.refetch();
            return mapData(result.data?.data ?? []);
        }, [query])
    }
}

export const useGetInformacion = (idCurso: number) => {
    return useQuery<PlanEstudioInformacionResponse, Error>({
         queryKey: [PLAN_ESTUDIO_ENDPOINTS.GET_INFORMACION_MATERIAS.key, idCurso],
         queryFn: async () => await apiClient.get<PlanEstudioInformacionResponse>(`${PLAN_ESTUDIO_ENDPOINTS.GET_INFORMACION_MATERIAS.path}?id_curso=${idCurso}`),
         staleTime: 1000 * 60 * 5, // 5 minutos de stale time
     });
}

export const useGetVideoMapa = () => {
    const mapaCurricular = useGetManuales("Mapa Curricular", "alumnos");
    const video = useGetManuales("Video de Bienvenida", "alumnos");
    const dataModulo = useGetDatosModulos(1);

    return { mapaCurricular, video, dataModulo };
}

export const useCreateConfirmar = async (id_curso: number): Promise<any> => {
    const payload = {id_curso};

    const encryptedPayload = await apiClient.encryptData({...payload});
    return await apiClient.post<any>(PLAN_ESTUDIO_ENDPOINTS.POST_CARGAR_CURSO.path, { data: encryptedPayload });
};