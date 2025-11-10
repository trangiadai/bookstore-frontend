import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/bookstore",
});

// Thêm interceptor để tự động gắn token vào header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // lấy token từ localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
