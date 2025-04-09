import { Injectable } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { isString } from "util";
import { select, Store } from "@ngrx/store";
import * as fromRoot from "@core/redux";
import * as _ from "lodash";
import * as TaskActions from "@core/redux/task/task.actions";
import { combineLatest } from "rxjs/internal/observable/combineLatest";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TaskQueryService {
  private _text: string | null = null;
  private _fields: string[] = [];
  private _expand: string[] = [];
  private _sort: string;
  private _isArchive = 0;
  private _offset = 0;
  private _limit = 20;
  private _authorId: string[] = [];
  private _responsibleId: string[] = [];
  private _statusId: string[] = [];
  private _tagId: string[] = [];

  set tagId(value: string[]) {
    this._setArrayProperty("_tagId", value);
  }

  set statusId(value: string[]) {
    this._setArrayProperty("_statusId", value);
  }

  get responsibleId() {
    return this._responsibleId;
  }

  set responsibleId(value: string[]) {
    this._setArrayProperty("_responsibleId", value);
  }

  set authorId(value: string[]) {
    this._setArrayProperty("_authorId", value);
  }

  set limit(value: number) {
    this._setProperty("_limit", value);
  }

  set offset(value: number) {
    this._setProperty("_offset", value);
  }

  set isArchive(value: number) {
    this._setProperty("_isArchive", value);
  }

  set sort(value: string) {
    this._setProperty("_sort", value);
  }

  set expand(value: string[]) {
    this._setArrayProperty("_expand", value);
  }

  set fields(value: string[]) {
    this._setArrayProperty("_fields", value);
  }

  set text(value: string) {
    this._setProperty("_text", value);
  }

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._subscribeFetchTask();
  }

  /**
   * Активный поиск по ответственному
   *
   * @param id
   */
  isActiveResponsible(id) {
    return this._responsibleId.indexOf(id) > -1;
  }

  /**
   * Добавить или удалить ответственного
   * из фильтрации
   *
   * @param id
   */
  toggleResponsible(id: string) {
    const index = this._responsibleId.indexOf(id);

    if (index === -1) {
      this._responsibleId.push(id);
    } else {
      this._responsibleId.splice(index, 1);
    }

    this.navigate();
  }

  /**
   * Меняем состояние url
   */
  navigate() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.getQuery(),
    });
  }

  /**
   * Мапинг параметров
   *
   * @param params
   */
  load(params: Params) {
    this.responsibleId = params.hasOwnProperty("responsibleId")
      ? params["responsibleId"]
      : [];
    this.authorId = params.hasOwnProperty("authorId") ? params["authorId"] : [];
    this.statusId = params.hasOwnProperty("statusId") ? params["statusId"] : [];
    this.tagId = params.hasOwnProperty("tagId") ? params["tagId"] : [];
    this.text = params.hasOwnProperty("text") ? params["text"] : null;
    this.isArchive = params.hasOwnProperty("isArchive")
      ? +params["isArchive"]
      : 0;

    if (params.hasOwnProperty("sort")) {
      this.sort = params["sort"];
    } else if (this.router.url.indexOf("/load/list") > 0) {
      this.sort = "-updatedAt";
    } else {
      this.sort = "board";
    }

    return this;
  }

  /**
   * Обновить стор
   */
  reload() {
    this._fetchData();
  }

  /**
   * Получить query для навигации
   */
  getQuery() {
    const query = {};

    if (this._responsibleId.length) {
      query["responsibleId"] = this._responsibleId.concat();
    }

    if (this._authorId.length) {
      query["authorId"] = this._authorId.concat();
    }

    if (this._statusId.length) {
      query["statusId"] = this._statusId.concat();
    }

    if (this._tagId.length) {
      query["tagId"] = this._tagId.concat();
    }

    if (this._fields.length) {
      query["fields"] = this._fields.concat();
    }

    if (this._expand.length) {
      query["expand"] = this._expand.concat();
    }

    if (this._text) {
      query["text"] = this._text;
    }

    if (this._isArchive) {
      query["isArchive"] = +this._isArchive;
    }

    if (this._sort) {
      query["sort"] = this._sort;
    }

    return query;
  }

  /**
   * Загрузить данные в стор
   * @private
   */
  private _fetchData() {
    this.store.dispatch(new TaskActions.SearchAction(this.getQuery()));
  }

  /**
   * Задать проперти в виде массива
   *
   * @param property
   * @param value
   * @private
   */
  private _setArrayProperty(property, value) {
    if (isString(value)) {
      value = [value];
    }

    if (!_.isEqual(this[property], value)) {
      this[property].length = 0;
      this[property].push(...value);
    }
  }

  /**
   * Задать проперти
   *
   * @param property
   * @param value
   * @private
   */
  private _setProperty(property, value) {
    if (this[property] !== value) {
      this[property] = value;
    }
  }

  /**
   * Подписка на роутер и смену проекта для запуска получения задач
   * @private
   */
  private _subscribeFetchTask() {
    const queryParams$ = this.route.queryParams;
    const projectId$ = this.store.pipe(
      select(fromRoot.getProjectSelectedId),
      filter((_) => !!_)
    );

    const combined = combineLatest(queryParams$, projectId$);

    combined.subscribe(([params, projectId]) => {
      this.load(params);
      this._fetchData();
    });
  }
}
