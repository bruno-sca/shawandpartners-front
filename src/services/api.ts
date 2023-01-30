import axios, { AxiosInstance, AxiosPromise } from "axios";

export type Api = AxiosInstance;
export type ApiResponse<T = void> = AxiosPromise<T>;

const apiURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: apiURL,
});
