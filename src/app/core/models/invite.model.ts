import {BaseModel} from './base.model';
import {UserModel} from './user.model';

export class InviteModel extends BaseModel {
  id: string;
  status: 'noActivate' | 'activate' | 'delete';
  userId: string;
  role: 'owner' | 'admin' | 'retail' | 'user';
  createdAt: string;
  email: string;
  projectId: string;
  user: UserModel;
}


export interface RoleInterface {
  id: string;
  name: string;
}

export interface SetOnlineInterface {
  id: string;
  activityAt: string;
}
