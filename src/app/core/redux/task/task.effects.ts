import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {TaskService} from '@core/services/task.service';
import {TaskModel} from '@core/models/task.model';
import {
  CreateAction,
  CreateFailureAction,
  CreateSuccessAction,
  TaskActionTypes,
  SaveAction,
  SaveFailureAction,
  SaveSuccessAction,
  SearchFailureAction,
  SearchSuccessAction,
  OrderAction,
  OrderSuccessAction,
  OrderFailureAction,
  FavoriteAction,
  FavoriteSuccessAction,
  FavoriteFailureAction,
  SearchFavoriteSuccessAction,
  SearchFavoriteFailureAction,
  FindOneAction,
  FindOneSuccessAction,
  FindOneFailureAction,
  SearchNotificationSuccessAction,
  SearchNotificationFailureAction,
  SearchAction,
  ParticleAction,
  ParticleSuccessAction, ParticleFailureAction, ArchiveAction, ArchiveSuccessAction, ArchiveFailureAction,
} from './task.actions';

import * as fromRoot from '@core/redux/index';
import {Store} from '@ngrx/store';

@Injectable()
export class TaskEffects {

  constructor(private store: Store<fromRoot.State>,
              private actions$: Actions,
              private taskService: TaskService) {
  }

  @Effect()
  search$ = this.actions$.pipe(
    ofType(TaskActionTypes.SearchAction),
    map((action: SearchAction) => action.payload),
    switchMap((query: any) => {
        return this.taskService
          .findAll(query)
          .pipe(
            map((task) => new SearchSuccessAction(task)),
            catchError((errors) => of(new SearchFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  searchParticle$ = this.actions$.pipe(
    ofType(TaskActionTypes.ParticleAction),
    map((action: ParticleAction) => action.payload),
    switchMap((query: any) => {
        return this.taskService
          .findAll(query)
          .pipe(
            map((task) => new ParticleSuccessAction(task)),
            catchError((errors) => of(new ParticleFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  searchNotification$ = this.actions$.pipe(
    ofType(TaskActionTypes.SearchNotificationAction),
    switchMap(() => {
        return this.taskService
          .findAllNotification()
          .pipe(
            map((task) => new SearchNotificationSuccessAction(task)),
            catchError((errors) => of(new SearchNotificationFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  findOne$ = this.actions$.pipe(
    ofType(TaskActionTypes.FindOneAction),
    map((action: FindOneAction) => action.payload),
    switchMap((id: string) => {
        return this.taskService
          .findOne(id)
          .pipe(
            map((task) => new FindOneSuccessAction(task)),
            catchError((errors) => of(new FindOneFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  searchFavorite$ = this.actions$.pipe(
    ofType(TaskActionTypes.SearchFavoriteAction),
    switchMap(() => {
        return this.taskService
          .findAllFavorite()
          .pipe(
            map((task) => new SearchFavoriteSuccessAction(task)),
            catchError((errors) => of(new SearchFavoriteFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  order$ = this.actions$.pipe(
    ofType(TaskActionTypes.OrderAction),
    map((action: OrderAction) => action.payload),
    switchMap((model: TaskModel) => {
        return this.taskService
          .order(model)
          .pipe(
            map((task) => new OrderSuccessAction(task)),
            catchError((errors) => of(new OrderFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  save$ = this.actions$.pipe(
    ofType(TaskActionTypes.SaveAction),
    map((action: SaveAction) => action.payload),
    switchMap((model: TaskModel) => {
        return this.taskService
          .save(model)
          .pipe(
            map((task) => new SaveSuccessAction(task)),
            catchError((errors) => of(new SaveFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  archive$ = this.actions$.pipe(
    ofType(TaskActionTypes.ArchiveAction),
    map((action: ArchiveAction) => action.payload),
    switchMap((model: TaskModel) => {
        return this.taskService
          .save(model)
          .pipe(
            map((task) => new ArchiveSuccessAction(task)),
            catchError((errors) => of(new ArchiveFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  favorite$ = this.actions$.pipe(
    ofType(TaskActionTypes.FavoriteAction),
    map((action: FavoriteAction) => action.payload),
    switchMap((model: TaskModel) => {
        return this.taskService
          .favorite(model)
          .pipe(
            map((task) => new FavoriteSuccessAction(task)),
            catchError((errors) => of(new FavoriteFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  create$ = this.actions$.pipe(
    ofType(TaskActionTypes.CreateAction),
    map((action: CreateAction) => action.payload),
    switchMap((model: TaskModel) => {
        return this.taskService
          .create(model)
          .pipe(
            switchMap((task) => [
                // new CloseTaskFormMenu(),
                new CreateSuccessAction(task)
              ],
            ),
            catchError((errors) => of(new CreateFailureAction(errors)))
          );
      }
    )
  );

  // @Effect()
  // ioTaskUpdated$: Observable<Action> =
  //   this.taskService.ioTaskUpdated$
  //     .switchMap((task) =>
  //       Observable.of(new SaveSuccessAction(task))
  //     );
}
