import { useQuery } from "@tanstack/react-query";
import type { ManualesResponse, ManualesUsuarioResponse, LineamientosUsuarioResponse } from "../types/manuales.interface";
import { MANUALES_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import { TipoManuales } from '../types/tipoManuales';
import type { DocumentosResponse } from "../types/Documentos.interface";


export const useGetManuales = (nombre_tipo: string, type: 'alumnos' | '' = '', id_plan_estudios: number = 0) => {
    const tipoInduccion = TipoManuales.find(
        (tipo) => tipo.nombre_tipo === nombre_tipo
    );
    const idInduccion = tipoInduccion?.id_tipo_manual;
    const url = `${MANUALES_ENDPOINTS.GET_MANUALES.path}${type !== '' ? `/${type}` : ''}?tipo=${idInduccion}${id_plan_estudios > 0 ? `&id_plan_estudio=${id_plan_estudios}` : ''}`;
    return useQuery<ManualesResponse, Error>({
        queryKey: [MANUALES_ENDPOINTS.GET_MANUALES.key, idInduccion],
        queryFn: async () => await apiClient.get<ManualesResponse>(url),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
         enabled: id_plan_estudios !== undefined && id_plan_estudios !== null && id_plan_estudios > 0,
    });

}

export const useGetManualesUsuario = () => {
    const url = `${MANUALES_ENDPOINTS.GET_MANUALES_USUARIO.path}`;
    return useQuery<ManualesUsuarioResponse, Error>({
        queryKey: [MANUALES_ENDPOINTS.GET_MANUALES_USUARIO.key],
        queryFn: async () => await apiClient.get<ManualesUsuarioResponse>(url),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    }).data;
}

export const useGetLineamientossUsuario = () => {
    const url = `${MANUALES_ENDPOINTS.GET_LINEAMIENTOS_USUARIO.path}`;
    return useQuery<LineamientosUsuarioResponse, Error>({
        queryKey: [MANUALES_ENDPOINTS.GET_LINEAMIENTOS_USUARIO.key],
        queryFn: async () => await apiClient.get<LineamientosUsuarioResponse>(url),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    }).data;
}

export const useGetAllDocuments = () => {
    const url = `${MANUALES_ENDPOINTS.GET_MANUALES_TODOS.path}`;
    return useQuery<DocumentosResponse, Error>({
        queryKey: [MANUALES_ENDPOINTS.GET_MANUALES_TODOS.key],
        queryFn: async () => await apiClient.get<DocumentosResponse>(url),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
}