import { TERMINOS_CONDICIONES } from "../types/endpoints";
import { apiClient } from "./ApiConfiguration/httpClient";

export const useTerminos = async (payload: { documentos_legales: number[]}) => {
    const encryptedPayload = await apiClient.encryptData({ ...payload });
    return await apiClient.post(TERMINOS_CONDICIONES.POST_TERMINOS.path, { data: encryptedPayload });
}