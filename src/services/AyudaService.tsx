import { useQuery } from "@tanstack/react-query";
import type { AyudaInteriorResponse, AyudaMateria, AyudaMateriasResponse, AyudaPayload, AyudaResponse, AyudaTemasResponse, AyudaTutor, AyudaTutoresResponse, AyudaTutorPayload, Temas, TicketsAyudaTutorResponse } from "../types/ayuda.interface";
import { AYUDA_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import React from "react";

export const useCreateAyuda = async (payload: AyudaPayload): Promise<AyudaResponse> => {
    payload = {...payload, telefono: payload.telefono.replace(/\D/g, "")};

    const encryptedPayload = await apiClient.encryptData({...payload});
    return await apiClient.post<AyudaResponse>(AYUDA_ENDPOINTS.POST_AYUDA.path, { data: encryptedPayload });
};

export const useCreateAyudaAlumnos = async (payload: AyudaPayload): Promise<TicketsAyudaTutorResponse> => {
    payload = {...payload, telefono: payload.telefono.replace(/\D/g, "")};

    const encryptedPayload = await apiClient.encryptData({...payload});
    return await apiClient.post<TicketsAyudaTutorResponse>(AYUDA_ENDPOINTS.POST_AYUDA_ALUMNOS.path, { data: encryptedPayload });
};

export const useCreateAyudaTutor = async (payload: AyudaTutorPayload): Promise<TicketsAyudaTutorResponse> => {
    const encryptedPayload = await apiClient.encryptData({...payload});
    return await apiClient.post<TicketsAyudaTutorResponse>(AYUDA_ENDPOINTS.POST_AYUDA_TUTOR.path, { data: encryptedPayload });
};

export const useGetAyudaTickets = () => {
    return useQuery<AyudaInteriorResponse, Error>({
         queryKey: [AYUDA_ENDPOINTS.GET_AYUDA.key],
         queryFn: async () => await apiClient.get<AyudaInteriorResponse>(`${AYUDA_ENDPOINTS.GET_AYUDA.path}`),
         staleTime: 1000 * 60 * 5, // 5 minutos de stale time
     });
}

export const useGetMaterias = () => {
    const query = useQuery<AyudaMateriasResponse, Error>({
         queryKey: [AYUDA_ENDPOINTS.GET_MATERIAS.key],
         queryFn: async () => await apiClient.get<AyudaMateriasResponse>(`${AYUDA_ENDPOINTS.GET_MATERIAS.path}`),
         staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });

    const mapData = (data: AyudaMateria[]) => {
        const res = [...data, {id_curso: 0, nombre_curso: 'Seleccionar'}].sort((a, b) => a.id_curso - b.id_curso);
        return res;
    }

    return {
        ...query,
        data: React.useMemo(
            () => mapData(query.data?.data ?? []),
            [query.data]
        )
    }
}

export const useGetTutores = (id_curso: number, options?: { enabled?: boolean }) => {
    const query = useQuery<AyudaTutoresResponse, Error>({
         queryKey: [AYUDA_ENDPOINTS.GET_TUTORES.key],
         queryFn: async () => await apiClient.get<AyudaTutoresResponse>(`${AYUDA_ENDPOINTS.GET_TUTORES.path}?id_curso=${id_curso}`),
         staleTime: 1000 * 60 * 5, // 5 minutos de stale time
         ...options
     });

     const mapData = (data: AyudaTutor[]) => {
        const res = [...data, {id_tutor: 0, nombre_tutor: 'Seleccionar'}].sort((a, b) => a.id_tutor - b.id_tutor);
        return res;
    }

    return {
        ...query,
        data: React.useMemo(
            () => mapData(query.data?.data ?? []),
            [query.data]
        )
    }
}

export const useGetTemas = () => {
    const query = useQuery<AyudaTemasResponse, Error>({
         queryKey: [AYUDA_ENDPOINTS.GET_ASUNTOS_TEMAS.key],
         queryFn: async () => await apiClient.get<AyudaTemasResponse>(`${AYUDA_ENDPOINTS.GET_ASUNTOS_TEMAS.path}`),
         staleTime: 1000 * 60 * 5, // 5 minutos de stale time
     });

     const mapData = (data: Temas[]) => {
        const res = [...data, {id_tema_ayuda: 0, nombre_tema: 'Seleccionar Asunto'}].sort((a, b) => a.id_tema_ayuda - b.id_tema_ayuda);
        return res;
    }

    return {
        ...query,
        data: React.useMemo(
            () => mapData(query.data?.data ?? []),
            [query.data]
        )
    }
}

