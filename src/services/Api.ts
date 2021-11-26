import axios, { AxiosInstance } from 'axios';

const baseURL: string = process.env.REACT_APP_URL_API as string;

const instanceAxios: AxiosInstance = axios.create({
  baseURL,
});

export default instanceAxios;
