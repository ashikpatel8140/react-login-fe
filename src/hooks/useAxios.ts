import { useSelector } from "react-redux";
import { RootState } from "../store";
import axios from "../api/axios";
import { useEffect } from "react";
import { InternalAxiosRequestConfig } from "axios";

const useAxios = () => {
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        if (!config.headers.Authorization && user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axios;
};

export default useAxios;
