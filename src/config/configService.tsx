import axios from 'axios';
import { saveConfig } from './configStorage';
import { LOGIN_ENDPOINTS } from '../types/endpoints';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const IS_PRODUCTION = import.meta.env.VITE_APP_IS_PRODUCTION === 'true';

export const fetchConfigFromApi = async () => {

  const PLAN = 'https://campusflexible.mercadotecnia.mx';
  const origin = !IS_PRODUCTION ? PLAN : window.location.origin;

  const { data } = await axios.get(`${BASE_URL}${LOGIN_ENDPOINTS.GET_PLAN_ESTUDIO.path}?url=${origin}`);
  
  if (data.data.nombre_empresa) {
    document.title = data.data.nombre_empresa;
    const link =
      document.querySelector<HTMLLinkElement>("link[rel~='icon']") ||
      document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = data.data.logo_url_mini;
    document.head.appendChild(link);
  } else {
    document.title = "Campus Evolutivo AG";
  }

  await saveConfig(data);
  return data;
};