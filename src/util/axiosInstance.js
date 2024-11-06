import axios from 'axios';
import router from '@/router';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken') || ''}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      router.push({ name: 'login' });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
