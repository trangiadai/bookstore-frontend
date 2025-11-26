// src/lib/httpClient.js
import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:8080/bookstore",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});
// Thêm interceptor để gắn Bearer Token vào mọi request
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});