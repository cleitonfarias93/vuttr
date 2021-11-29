import { AxiosResponse } from 'axios';

// Models
import { SearchParams, ModelForm } from 'models';

import Api from './Api';

export const postTool = (tool: ModelForm): Promise<AxiosResponse> => Api.post('/tools', tool);

export const getTools = (): Promise<AxiosResponse> => Api.get('/tools');

export const getToolsByQuery = (params: SearchParams): Promise<AxiosResponse> => Api.get('/tools', {
  params,
});

export const deleteTool = (id: number | string): Promise<AxiosResponse> => Api.delete(`/tools/${id}`);
