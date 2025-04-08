import {BaseModel} from './base.model';

export class StatusModel extends BaseModel {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  projectId: boolean;
  isBackLog: boolean;
}
