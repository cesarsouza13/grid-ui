
import Cookies from 'js-cookie';

import type { ExceptionOrPromise } from "../type/exception";
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from "axios"

import { store } from '../../store/store';
import { setLogout } from '../../store/AuthSlice';

  
const GRID_API_URL = import.meta.env.VITE_GRID_API_URL;
const DefaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json"
};


export type httpMethode = "get" | "delete" | "head" | "post" | "put" | "patch"

export type EndpointConfig = {
    method: httpMethode;
    baseUrl?: string;
    path: string;
    data?: object;
    headers?: object;
    params?: object;
    responseType?: ResponseType;
}



let axiosInstance: AxiosInstance;

export const getAxiosInstance = () => {
    if (axiosInstance) return axiosInstance;

    axiosInstance = axios.create({
        baseURL: GRID_API_URL,
        headers: { ...DefaultHeaders },
        timeout: 15000
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = Cookies.get("token"); 
            if (token) config.headers["Authorization"] = `Bearer ${token}`;
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                const { status } = error.response;
                if (status === 401 || status === 403) {
                    Cookies.remove("token"); 
                    store.dispatch(setLogout());
                    window.location.href = "/";
                }
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};



export const requestApi = <T, E = unknown>(
    config: EndpointConfig
): ExceptionOrPromise<AxiosResponse<T>, AxiosError<E>> => {
    const{baseUrl, data, path, headers, params, method, responseType} = config;
    const axios = getAxiosInstance();

    return axios({
        method,
        baseURL: baseUrl,
        url: path,
        data,
        params,
        headers,
        responseType
    })
}