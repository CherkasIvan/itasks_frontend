import {UserModel} from '@core/models/user.model';

export function getUser(): UserModel | null {
  const authData = localStorage.getItem('auth');
  if (authData) {
    return JSON.parse(authData).user;
  } else {
    return null;
  }
}
