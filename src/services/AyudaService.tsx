import type { AyudaPayload, AyudaResponse } from "../types/ayuda.interface";
import { AYUDA_ENDPOINTS } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";

export const useCreateAyuda = async (payload: AyudaPayload): Promise<AyudaResponse> => {
    payload = {...payload, telefono: payload.telefono.replace(/\D/g, "")};

    const encryptedPayload = await apiClient.encryptData({...payload});
    return await apiClient.post<AyudaResponse>(AYUDA_ENDPOINTS.POST_AYUDA.path, { data: encryptedPayload });
};