import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { TaskModel } from "../models/task.model";
import { getSearchQuerys } from "@core/utils/query-builder";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TaskService extends ApiService {
  findOne(id: string) {
    return this.http
      .get<TaskModel[]>(this.getApiUrl(`tasks/${id}`))
      .pipe(map((response) => new TaskModel().setAttributes(response)));
  }

  findAllFavorite() {
    return this.http
      .get<TaskModel[]>(this.getApiUrl(`tasks?favorite=1`))
      .pipe(
        map((response) =>
          response.map((model) => new TaskModel().setAttributes(model))
        )
      );
  }

  findAll(query: any) {
    return this.http
      .get<TaskModel[]>(
        this.getApiUrl(`tasks?${getSearchQuerys(query).join("&")}`)
      )
      .pipe(
        map((response) =>
          response.map((model) => new TaskModel().setAttributes(model))
        )
      );
  }

  findAllNotification() {
    return this.http
      .get<TaskModel[]>(this.getApiUrl(`tasks?chat=1`))
      .pipe(
        map((response) =>
          response.map((model) => new TaskModel().setAttributes(model))
        )
      );
  }

  save(model: TaskModel) {
    return this.http
      .put<TaskModel>(this.getApiUrl(`tasks/${model.id}`), model)
      .pipe(map((response) => new TaskModel().setAttributes(response)));
  }

  favorite(model: TaskModel) {
    return this.http
      .put<TaskModel>(this.getApiUrl(`tasks/favorite/${model.id}`), {})
      .pipe(map((response) => new TaskModel().setAttributes(response)));
  }

  create(model: TaskModel) {
    return this.http
      .post<TaskModel>(this.getApiUrl(`tasks`), model)
      .pipe(map((response) => new TaskModel().setAttributes(response)));
  }

  order(model: TaskModel) {
    return this.http
      .put<TaskModel>(this.getApiUrl(`tasks/order/${model.id}`), model)
      .pipe(map((response) => new TaskModel().setAttributes(response)));
  }

  delete(model: TaskModel) {
    return this.http
      .delete<TaskModel>(this.getApiUrl(`tasks/${model.id}`))
      .pipe(map((response) => new TaskModel().setAttributes(response)));
  }
}
