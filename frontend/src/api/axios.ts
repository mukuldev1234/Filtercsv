import axios from "axios";

const api = axios.create({
  baseURL: "https://smart-leads-backend-u1bi.onrender.com/api",
});

// 🔥 REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    // GET TOKEN
    const token =
      localStorage.getItem("token");

    console.log(
      "AXIOS TOKEN:",
      token
    );

    // ADD AUTH HEADER
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default api;
