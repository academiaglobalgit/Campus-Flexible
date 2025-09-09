import axios from 'axios';
import { saveConfig } from './configStorage';
import { LOGIN_ENDPOINTS } from '../types/endpoints';

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const IS_PRODUCTION = import.meta.env.VITE_APP_IS_PRODUCTION === 'true';

export const fetchConfigFromApi = async () => {
  const PLAN = 'https://campusflexible.academiaglobal.mx';
  const origin = !IS_PRODUCTION ? PLAN : window.location.origin;

  const { data } = await axios.get(`${BASE_URL}${LOGIN_ENDPOINTS.GET_PLAN_ESTUDIO.path}?url=${origin}`);
  await saveConfig(data);
  return data;
};