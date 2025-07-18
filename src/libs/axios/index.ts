import axios, { AxiosRequestConfig } from "axios";
// config
import { HOST_API } from "@/config";

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  timeout: 30000 // 10 seconds timeout
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("_AK_TOKEN_") || "{}").token;

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

// Add response interceptor to handle 401 errors and CORS issues
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Axios error:", error);

    // Handle CORS errors (error.response is null)
    if (!error.response) {
      console.error("CORS error or network issue:", error.message);
      // You can handle CORS errors here, e.g., show a user-friendly message
      return Promise.reject({
        message: "Network error or CORS issue. Please check your connection.",
        isCorsError: true
      });
    }

    // Check if error has response and status is 401
    if (error.code === -401) {
      // Clear token from localStorage
      localStorage.removeItem("_AK_TOKEN_");

      (window as any).sign();
    }

    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};
