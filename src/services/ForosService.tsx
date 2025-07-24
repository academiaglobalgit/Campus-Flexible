import type { ForosSaveResponse, TemaForoByIdResponse } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./ApiConfiguration/httpClient";
import { SALA_CONVERSACION } from "../types/endpoints";
import type { ForoMensajesResponse } from "../types/SalaConversacion.interface";


export const GetTemaForoById = (idRecurso: number, options?: { enabled?: boolean }) => {
    return useQuery<TemaForoByIdResponse, Error>({
        queryKey: [SALA_CONVERSACION.GET_TEMA_FORO_BY_ID.key],
        queryFn: () => apiClient.get<TemaForoByIdResponse>(`${SALA_CONVERSACION.GET_TEMA_FORO_BY_ID.path}?id_recurso=${idRecurso}`),
        ...options
    });
}

export const GetMensajesForo = (idRecurso: number, pagina: number, todos: number, orden: string, paginasize: number) => {
    return useQuery<ForoMensajesResponse, Error>({
        queryKey: [SALA_CONVERSACION.GET_MENSAJES.key, idRecurso, pagina, todos, orden, paginasize],
        queryFn: async () => await apiClient.get<ForoMensajesResponse>(
            `${SALA_CONVERSACION.GET_MENSAJES.path}?id_tipo_sala=3&id_recurso=${idRecurso}&pagina=${pagina}&todos=${todos}&orden=${orden}&paginasize=${paginasize}`
        ),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
}

export const SaveComentarioForo = async (payload: 
    { 
        id_mensaje: number | null, id_recurso: number, mensaje: string, id_mensaje_respuesta: number | null
    }): Promise<ForosSaveResponse> => {

        console.log(payload);

    const encryptedPayload = await apiClient.encryptData({...payload});
    return await apiClient.post<ForosSaveResponse>(SALA_CONVERSACION.SET_MENSAJES.path, { data: encryptedPayload });
};

export const DeleteMensaje = async (id_mensaje: number): any => {
    const payload = {id_mensaje};
    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient.post<any>(SALA_CONVERSACION.DELETE_MENSAJES.path, { data: encryptedPayload });
};