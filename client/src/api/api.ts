import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const defaultAxiosConfiguration = {
  baseURL: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASE_URL : '/',
};

const axiosInstance = axios.create(defaultAxiosConfiguration);
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

function api(axios: AxiosInstance) {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.get<T>(url, config),

    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.post<T>(url, body, config),

    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.put<T>(url, body, config),

    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.patch<T>(url, body, config),

    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.delete<T>(url, config),
  };
}

export default api(axiosInstance);
