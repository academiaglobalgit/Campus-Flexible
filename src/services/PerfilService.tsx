import { PERFIL_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { PerfilPayload } from "@constants";

export const useCreatePerfil = async (payload: PerfilPayload): Promise<any> => {
    console.log(payload);
    const encryptedPayload = await apiClient.encryptData({...payload});
    return await apiClient.post<any>(PERFIL_ENDPOINTS.POST_PERFIL.path, { data: encryptedPayload });
};