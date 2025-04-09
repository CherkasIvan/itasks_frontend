import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { ProjectModel } from "../models/project.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProjectService extends ApiService {
  findAll() {
    return this.http
      .get<ProjectModel[]>(this.getApiUrl(`projects`))
      .pipe(
        map((response) =>
          response.map((model) => new ProjectModel().setAttributes(model))
        )
      ); // Используйте pipe и map
  }

  save(model: ProjectModel) {
    return this.http
      .put<ProjectModel>(this.getApiUrl(`projects/${model.id}`), model)
      .pipe(map((response) => new ProjectModel().setAttributes(response))); // Используйте pipe и map
  }

  create(model: ProjectModel) {
    return this.http
      .post<ProjectModel>(this.getApiUrl(`projects`), model)
      .pipe(map((response) => new ProjectModel().setAttributes(response))); // Используйте pipe и map
  }

  delete(model: ProjectModel) {
    return this.http
      .delete<ProjectModel>(this.getApiUrl(`projects/${model.id}`))
      .pipe(map((response) => new ProjectModel().setAttributes(response))); // Используйте pipe и map
  }

  restore(model: ProjectModel) {
    return this.http
      .put<ProjectModel>(this.getApiUrl(`projects/restore/${model.id}`), {})
      .pipe(map((response) => new ProjectModel().setAttributes(response))); // Используйте pipe и map
  }
}
