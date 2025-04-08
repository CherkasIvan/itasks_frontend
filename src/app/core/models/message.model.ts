import {BaseModel} from './base.model';
import {UserModel} from './user.model';
import {InviteModel} from './invite.model';
import {FileModel} from './file.model';
import {IdentityModel} from '@core/models/identity.model';

export class MessageModel extends BaseModel {
  id: string;
  invite: InviteModel;
  isLike: boolean;
  author: IdentityModel;
  authorId: string;
  followers: string[];
  taskId: string;
  projectId: string;
  isPin: boolean;
  likes: string[] = [];
  time: number;
  message: string;
  files: any[] = [];
  createdAt: string;
  updatedAt: string;
  canUpdate: boolean;
}
