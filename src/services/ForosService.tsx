import type { ForosSaveResponse, TemaForoByIdResponse } from "@constants";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./ApiConfiguration/httpClient";
import { SALA_CONVERSACION } from "../types/endpoints";
import type { DatosSalaConversacionResponse, ForoMensajesResponse } from "../types/SalaConversacion.interface";


export const GetIdConversacion = (idTipoSala: number) => {
    return useQuery<DatosSalaConversacionResponse, Error>({
        queryKey: [SALA_CONVERSACION.GET_SALA_CONVERSACION.key, idTipoSala],
        queryFn: () => apiClient.get<DatosSalaConversacionResponse>(`${SALA_CONVERSACION.GET_SALA_CONVERSACION.path}?id_tipo_sala=${idTipoSala}`),
    });
}

export const GetTemaForoById = (idRecurso: number, options?: { enabled?: boolean }) => {
    return useQuery<TemaForoByIdResponse, Error>({
        queryKey: [SALA_CONVERSACION.GET_TEMA_FORO_BY_ID.key, idRecurso],
        queryFn: () => apiClient.get<TemaForoByIdResponse>(`${SALA_CONVERSACION.GET_TEMA_FORO_BY_ID.path}?id_recurso=${idRecurso}`),
        ...options
    });
}

export const GetMensajesForo = (id_tipo_sala: number, idRecurso: number, pagina: number, todos: number, orden: string, paginasize: number) => {

    const url = `${SALA_CONVERSACION.GET_MENSAJES.path}?id_tipo_sala=${id_tipo_sala}&id_recurso=${idRecurso}&pagina=${pagina}&todos=${todos}&orden=${orden}${id_tipo_sala !== 4 ? `&paginasize=${paginasize}` : ''}`;

    const keys = [SALA_CONVERSACION.GET_MENSAJES.key, id_tipo_sala, idRecurso, pagina, todos, orden, paginasize];

    if(id_tipo_sala !== 4) {
        keys.pop();
    }

    return useQuery<ForoMensajesResponse, Error>({
        queryKey: keys,
        queryFn: async () => await apiClient.get<ForoMensajesResponse>(url),
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

export const DeleteMensaje = async (id_mensaje: number) => {
    const payload = {id_mensaje};
    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient.post(SALA_CONVERSACION.DELETE_MENSAJES.path, { data: encryptedPayload });
};