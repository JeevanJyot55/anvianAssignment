import axios from 'axios';

const customerApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,   // must be http://localhost:3000
  headers: { 'Content-Type': 'application/json' },
});

customerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default customerApi;
