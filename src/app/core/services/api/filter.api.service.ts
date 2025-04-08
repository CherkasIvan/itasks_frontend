import {Injectable} from '@angular/core';
import {FilterModel} from '@core/models/filter.model';
import {ApiService} from '@core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class FilterApiService extends ApiService {
  findAll() {
    return this
      .http
      .get<FilterModel[]>(this.getApiUrl(`filters`));
  }

  save(model: FilterModel) {
    return this
      .http
      .put<FilterModel>(this.getApiUrl(`filters/${model.id}`), model);
  }

  create(model: FilterModel) {
    return this
      .http
      .post<FilterModel>(this.getApiUrl(`filters`), model);
  }

  delete(model: FilterModel) {
    return this
      .http
      .delete<FilterModel>(this.getApiUrl(`filters/${model.id}`));
  }
}
