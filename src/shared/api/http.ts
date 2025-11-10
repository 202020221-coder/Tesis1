import axios from "axios";

// import { useNavigate } from 'react-router';

import { useAuthStore } from "../store/AuthStore";

// const navigate = useNavigate();

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const { access_token: token } = useAuthStore.getState(); // ✅ leer token desde Zustand

    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

// // Response Interceptor → manejar 401 globalmente
// http.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {

//       const { logout } = useAuthStore.getState();

//       logout();

//       // toast.error('Sesión expirada. Por favor inicia sesión nuevamente.');

//       // Redirigir al login (ajusta según tu router)
//       navigate('/login');
//     }
//     return Promise.reject(error);
//   }
// );
