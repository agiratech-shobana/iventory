import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3003/api", // Your backend base URL
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 403) {
      alert("❌ You are not allowed to access this.");
    }
    return Promise.reject(err);
  }
);

export default instance;
