export interface FilterModel {
  id: string;
  name: string;
  text: string;
  isArchive: number;
  responsibleIds: string[];
  authorIds: string[];
  tagIds: string[];
  statusIds: string[];
}
