import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ProjectModel} from '../models/project.model';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService {
  findAll() {
    return this
      .http
      .get<ProjectModel[]>(this.getApiUrl(`projects`))
      .map((response) => response.map(model => (new ProjectModel).setAttributes(model)));
  }

  save(model: ProjectModel) {
    return this
      .http
      .put<ProjectModel>(this.getApiUrl(`projects/${model.id}`), model)
      .map((response) => (new ProjectModel).setAttributes(response));
  }

  create(model: ProjectModel) {
    return this
      .http
      .post<ProjectModel>(this.getApiUrl(`projects`), model)
      .map((response) => (new ProjectModel).setAttributes(response));
  }

  delete(model: ProjectModel) {
    return this
      .http
      .delete<ProjectModel>(this.getApiUrl(`projects/${model.id}`))
      .map((response) => (new ProjectModel).setAttributes(response));
  }

  restore(model: ProjectModel) {
    return this
      .http
      .put<ProjectModel>(this.getApiUrl(`projects/restore/${model.id}`), {})
      .map((response) => (new ProjectModel).setAttributes(response));
  }
}
