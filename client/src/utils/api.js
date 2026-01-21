import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050/api", // Backend base URL
});

// Automatically attach JWT token (if available)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
