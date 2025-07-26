import { PERFIL_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";
import type { PerfilPayload } from "@constants";

export const useCreatePerfil = async (payload: PerfilPayload): Promise<any> => {
    const encryptedPayload = await apiClient.encryptData({correo: payload.correo, telefonos: payload.telefonos});

    const formData = new FormData();
    formData.append("data", encryptedPayload);

    if(payload.foto_perfil_url) formData.append("foto_perfil", payload.foto_perfil_url);
    
    return await apiClient.post<any>(
        PERFIL_ENDPOINTS.POST_PERFIL.path,
        formData
      );
};