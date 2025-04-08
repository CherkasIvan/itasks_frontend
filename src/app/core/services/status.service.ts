import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {StatusModel} from '../models/status.model';
import {StatusSortModel} from '../models/status-sort.model';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class StatusService extends ApiService {
  findAll() {
    return this
      .http
      .get<StatusModel[]>(this.getApiUrl(`statuses`))
      .map((response) => response.map(model => (new StatusModel).setAttributes(model)));
  }

  save(model: StatusModel) {
    return this
      .http
      .put<StatusModel>(this.getApiUrl(`statuses/${model.id}`), model)
      .map((response) => (new StatusModel).setAttributes(response));
  }

  sort(model: StatusSortModel) {
    return this
      .http
      .put<StatusModel>(this.getApiUrl(`statuses/order`), model)
      .map((response) => (new StatusSortModel).setAttributes(response));
  }

  create(model: StatusModel) {
    return this
      .http
      .post<StatusModel>(this.getApiUrl(`statuses`), model)
      .map((response) => (new StatusModel).setAttributes(response));
  }

  delete(model: StatusModel) {
    return this
      .http
      .delete<StatusModel>(this.getApiUrl(`statuses/${model.id}`))
      .map((response) => (new StatusModel).setAttributes(response));
  }
}
