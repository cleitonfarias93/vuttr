import { AxiosResponse } from 'axios';
import Api from './Api';

export const getTools = (): Promise<AxiosResponse> => Api.get('/tools');

export const deleteTool = (id: number | string): Promise<AxiosResponse> => Api.delete(`/tools/${id}`);
