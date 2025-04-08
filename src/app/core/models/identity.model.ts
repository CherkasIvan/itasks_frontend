import {BaseModel} from './base.model';
import {FileModel} from '@core/models/file.model';

export class IdentityModel extends BaseModel {
  id: string;
  avatar: FileModel;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  birthday: string;
  companyCountEmployeesFrom: number;
  companyCountEmployeesTo: number;
  companyName: string;
  floor: string;
  skype: string;
  step: string;
  activityAt: string;
  canAdmin: boolean;
  telegramIsActive: boolean;
  telegramToken: boolean;
}
