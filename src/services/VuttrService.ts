import { AxiosResponse } from 'axios';
import Api from './Api';

export const getTools = (): Promise<AxiosResponse> => Api.get('/tools');
