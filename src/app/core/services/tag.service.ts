import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { TagModel } from "../models/tag.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TagService extends ApiService {
  findAll() {
    return this.http
      .get<TagModel[]>(this.getApiUrl(`tags`))
      .pipe(
        map((response) =>
          response.map((model) => new TagModel().setAttributes(model))
        )
      );
  }

  save(model: TagModel) {
    return this.http
      .put<TagModel>(this.getApiUrl(`tags/${model.id}`), model)
      .pipe(map((response) => new TagModel().setAttributes(response)));
  }

  create(model: TagModel) {
    return this.http
      .post<TagModel>(this.getApiUrl(`tags`), model)
      .pipe(map((response) => new TagModel().setAttributes(response)));
  }

  delete(model: TagModel) {
    return this.http.delete<TagModel>(this.getApiUrl(`tags/${model.id}`));
  }
}
