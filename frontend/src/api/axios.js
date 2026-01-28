import axios from 'axios';

const rawBaseURL = import.meta.env.VITE_API_URL || "http://localhost:5500";
const normalizedBaseURL = rawBaseURL.endsWith("/api/v1")
  ? rawBaseURL
  : `${rawBaseURL.replace(/\/$/, "")}/api/v1`;

const API = axios.create({
  baseURL: normalizedBaseURL,
});

// se existir token no localStorage, adiciona automaticamente
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;


