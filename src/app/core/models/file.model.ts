import {BaseModel} from './base.model';

export class FileModel extends BaseModel {
  id: string;
  originalName: string;
  file: string;
  forObject: 'comment' | 'task' | 'linkPreview' | 'linkFavicon' | 'userAvatar';
  objectId: string;
  projectId: string;
  size: number;
  isImage: boolean;
}
