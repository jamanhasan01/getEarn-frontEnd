import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosPrivate = () => {
  const { user } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token"); // Retrieve token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosPrivate;
};

export default useAxiosPrivate;
