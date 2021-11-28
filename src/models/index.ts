export interface ToolEntity {
  id: number | string;
  title: string;
  link?: string;
  description: string;
  tags: string[];
}

export interface SearchParams {
  tags_like?: string
  q?: string
}

export const ToolModel: ToolEntity = {
  id: '',
  title: '',
  description: '',
  tags: [],
  link: '',
};
