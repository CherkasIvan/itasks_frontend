import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { InviteModel, RoleInterface } from "../models/invite.model";
import { IdentityModel } from "@core/models/identity.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class InviteService extends ApiService {
  findAll(params) {
    return this.http
      .get<InviteModel[]>(this.getApiUrl(`invites`), { params: params })
      .pipe(
        map((response) =>
          response.map((model) => new InviteModel().setAttributes(model))
        )
      );
  }

  confirmation(token: string) {
    return this.http
      .get<IdentityModel>(this.getApiUrl(`invites/confirmation/${token}`))
      .pipe(map((response) => new IdentityModel().setAttributes(response)));
  }

  create(model: InviteModel) {
    return this.http
      .post<InviteModel>(this.getApiUrl(`invites`), model)
      .pipe(map((response) => new InviteModel().setAttributes(response)));
  }

  resend(id: string) {
    return this.http.put(this.getApiUrl(`invites/resend-email/${id}`), {});
  }

  save(model: InviteModel) {
    return this.http
      .put<InviteModel>(this.getApiUrl(`invites/${model.id}`), model)
      .pipe(map((response) => new InviteModel().setAttributes(response)));
  }

  delete(id: string) {
    return this.http
      .delete(this.getApiUrl(`invites/${id}`))
      .pipe(map((response) => new InviteModel().setAttributes(response)));
  }

  findAllRoles(): RoleInterface[] {
    return [
      { id: "user", name: "Пользователь" },
      { id: "admin", name: "Администратор" },
    ];
  }
}
