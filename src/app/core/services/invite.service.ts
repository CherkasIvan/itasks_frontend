import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {InviteModel, RoleInterface} from '../models/invite.model';
import 'rxjs/add/operator/map';
import {IdentityModel} from '@core/models/identity.model';

@Injectable({
  providedIn: 'root'
})
export class InviteService extends ApiService {
  findAll(params) {
    return this
      .http
      .get<InviteModel[]>(this.getApiUrl(`invites`), {params: params})
      .map((response) => response.map(model => (new InviteModel()).setAttributes(model)));
  }

  confirmation(token: string) {
    return this
      .http
      .get<IdentityModel>(this.getApiUrl(`invites/confirmation/${token}`))
      .map((response) => (new IdentityModel()).setAttributes(response));
  }

  create(model: InviteModel) {
    return this
      .http
      .post<InviteModel>(this.getApiUrl(`invites`), model)
      .map((response) => (new InviteModel()).setAttributes(response));
  }

  resend(id: string) {
    return this
      .http
      .put(this.getApiUrl(`invites/resend-email/${id}`), {});
  }

  save(model: InviteModel) {
    return this
      .http
      .put<InviteModel>(this.getApiUrl(`invites/${model.id}`), model)
      .map((response) => (new InviteModel()).setAttributes(response));
  }

  delete(id: string) {
    return this
      .http
      .delete(this.getApiUrl(`invites/${id}`))
      .map((response) => (new InviteModel()).setAttributes(response));
  }

  findAllRoles(): RoleInterface[] {
    return [
      {id: 'user', name: 'Пользователь'},
      {id: 'admin', name: 'Администратор'}
    ];
  }
}
