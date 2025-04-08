import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, switchMap, map} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {FilterModel} from '@core/models/filter.model';
import {
  CreateAction,
  CreateFailureAction,
  CreateSuccessAction,
  DeleteAction, DeleteSuccessAction,
  FilterActionTypes,
  SaveAction,
  SaveFailureAction,
  SaveSuccessAction,
  SearchFailureAction,
  SearchSuccessAction,
} from './filter.actions';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../redux/index';
import {FilterApiService} from '@core/services/api/filter.api.service';

@Injectable()
export class FilterEffects {

  constructor(private store: Store<fromRoot.State>,
              private actions$: Actions,
              private filterService: FilterApiService) {
  }

  @Effect()
  search$ = this.actions$.pipe(
    ofType(FilterActionTypes.SearchAction),
    switchMap(() => {
        return this.filterService
          .findAll()
          .pipe(
            map((filters) => new SearchSuccessAction(filters)),
            catchError((errors) => of(new SearchFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  save$ = this.actions$.pipe(
    ofType(FilterActionTypes.SaveAction),
    map((action: SaveAction) => action.payload),
    switchMap((model: FilterModel) => {
        return this.filterService
          .save(model)
          .pipe(
            map((filter) => new SaveSuccessAction(filter)),
            catchError((errors) => of(new SaveFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  create$ = this.actions$.pipe(
    ofType(FilterActionTypes.CreateAction),
    map((action: CreateAction) => action.payload),
    switchMap((model: FilterModel) => {
        return this.filterService
          .create(model)
          .pipe(
            map((filter) => new CreateSuccessAction(filter)),
            catchError((errors) => of(new CreateFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType(FilterActionTypes.DeleteAction),
    map((action: DeleteAction) => action.payload),
    switchMap((model: FilterModel) => {
        return this.filterService
          .delete(model)
          .pipe(
            map(_ => new DeleteSuccessAction(model)),
            catchError((errors) => of(new SaveFailureAction(errors)))
          );
      }
    )
  );
}
