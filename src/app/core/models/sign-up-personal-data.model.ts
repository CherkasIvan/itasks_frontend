import {BaseModel} from './base.model';

export class SignUpPersonalDataModel extends BaseModel {
  phone: string | number;
  firstName: string;
  lastName: string;
  avatarId: string;
}
