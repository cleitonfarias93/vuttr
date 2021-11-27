export interface ToolEntity {
  id: number | string;
  title: string;
  link?: string;
  description: string;
  tags: string[];
}

export const ToolModel: ToolEntity = {
  id: '',
  title: '',
  description: '',
  tags: [],
  link: '',
};
