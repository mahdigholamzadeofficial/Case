import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// in real projects getToken method should return the token!
const getToken = () => {
  return;
};

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["x-client-time"] = new Date().getTime();
    config.headers.Authorization = `Bearer ${getToken()}`;

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 400) {
      return Promise.resolve(error.response);
    }
  }
);

export default axiosInstance;
