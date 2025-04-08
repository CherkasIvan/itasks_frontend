import {BaseModel} from './base.model';
import {FileModel} from './file.model';

export class UserModel extends BaseModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  avatarCssStyle: string;
  avatar: FileModel;
  activityAt: string;
}
