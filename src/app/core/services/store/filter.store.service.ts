import {Injectable} from '@angular/core';
import {isArray} from 'util';
import {FilterModel} from '@core/models/filter.model';
import {Params} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from '@core/redux/index';
import * as FilterAction from '@core/redux/filter/filter.actions';

@Injectable({
  providedIn: 'root'
})
export class FilterStoreService {
  constructor(private store: Store<fromRoot.State>) {

  }

  getFilterByParamsForQueryParams(filter: FilterModel) {
    const result = {};

    if (filter.responsibleIds.length) {
      result['responsibleId'] = filter.responsibleIds.concat();
    }

    if (filter.authorIds.length) {
      result['authorId'] = filter.authorIds.concat();
    }


    if (filter.statusIds.length) {
      result['statusId'] = filter.statusIds.concat();
    }

    if (filter.tagIds.length) {
      result['tagId'] = filter.tagIds.concat();
    }

    result['isArchive'] = filter.isArchive;

    if (filter.text) {
      result['text'] = filter.text;
    }

    return result;
  }

  getNewFilter(): FilterModel {
    return {
      id: null,
      name: null,
      text: null,
      isArchive: 0,
      responsibleIds: [],
      authorIds: [],
      tagIds: [],
      statusIds: []
    };
  }


  getNewFilterByParams(params?: Params): FilterModel {
    params = params || {};
    const filter: FilterModel = this.getNewFilter();

    if (params.hasOwnProperty('text') && params.text) {
      filter.text = params.text;
    }

    if (params.hasOwnProperty('isArchive') && params.isArchive) {
      filter.isArchive = +params.isArchive;
    }

    if (params.hasOwnProperty('responsibleId') && params.responsibleId) {
      filter.responsibleIds = isArray(params.responsibleId) ? params.responsibleId : [params.responsibleId];
    }

    if (params.hasOwnProperty('authorId')) {
      filter.authorIds = isArray(params.authorId) ? params.authorId : [params.authorId];
    }

    if (params.hasOwnProperty('tagId')) {
      filter.tagIds = isArray(params.tagId) ? params.tagId : [params.tagId];
    }

    if (params.hasOwnProperty('statusId')) {
      filter.statusIds = isArray(params.statusId) ? params.statusId : [params.statusId];
    }

    return filter;
  }

  saveFilter(model: FilterModel) {
    this.store.dispatch(new FilterAction.SaveAction(model));
  }

  createFilter(model: FilterModel) {
    this.store.dispatch(new FilterAction.CreateAction(model));
  }

  deleteFilter(model: FilterModel) {
    this.store.dispatch(new FilterAction.DeleteAction(model));
  }

  selectFilter(id: string | null) {
    this.store.dispatch(new FilterAction.SelectAction(id));
  }
}
