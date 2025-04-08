import {BaseModel} from './base.model';

export class ProjectModel extends BaseModel {
  id: string;
  name: string;
  color: string;
  description: string;
  isArchive: boolean;
  canUpdate: boolean;
}
