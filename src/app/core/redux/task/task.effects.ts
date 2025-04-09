import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { TaskService } from "@core/services/task.service";
import { TaskModel } from "@core/models/task.model";
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
  ParticleSuccessAction,
  ParticleFailureAction,
  ArchiveAction,
  ArchiveSuccessAction,
  ArchiveFailureAction,
} from "./task.actions";

import * as fromRoot from "@core/redux/index";
import { Store } from "@ngrx/store";

@Injectable()
export class TaskEffects {
  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
    private taskService: TaskService
  ) {}

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.SearchAction),
      map((action: SearchAction) => action.payload),
      switchMap((query: any) => {
        return this.taskService.findAll(query).pipe(
          map((task) => new SearchSuccessAction(task)),
          catchError((errors) => of(new SearchFailureAction(errors)))
        );
      })
    )
  );

  searchParticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.ParticleAction),
      map((action: ParticleAction) => action.payload),
      switchMap((query: any) => {
        return this.taskService.findAll(query).pipe(
          map((task) => new ParticleSuccessAction(task)),
          catchError((errors) => of(new ParticleFailureAction(errors)))
        );
      })
    )
  );

  searchNotification$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.SearchNotificationAction),
      switchMap(() => {
        return this.taskService.findAllNotification().pipe(
          map((task) => new SearchNotificationSuccessAction(task)),
          catchError((errors) =>
            of(new SearchNotificationFailureAction(errors))
          )
        );
      })
    )
  );

  findOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.FindOneAction),
      map((action: FindOneAction) => action.payload),
      switchMap((id: string) => {
        return this.taskService.findOne(id).pipe(
          map((task) => new FindOneSuccessAction(task)),
          catchError((errors) => of(new FindOneFailureAction(errors)))
        );
      })
    )
  );

  searchFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.SearchFavoriteAction),
      switchMap(() => {
        return this.taskService.findAllFavorite().pipe(
          map((task) => new SearchFavoriteSuccessAction(task)),
          catchError((errors) => of(new SearchFavoriteFailureAction(errors)))
        );
      })
    )
  );

  order$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.OrderAction),
      map((action: OrderAction) => action.payload),
      switchMap((model: TaskModel) => {
        return this.taskService.order(model).pipe(
          map((task) => new OrderSuccessAction(task)),
          catchError((errors) => of(new OrderFailureAction(errors)))
        );
      })
    )
  );

  archive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.ArchiveAction),
      map((action: ArchiveAction) => action.payload),
      switchMap((model: TaskModel) => {
        return this.taskService.save(model).pipe(
          map((task) => new ArchiveSuccessAction(task)),
          catchError((errors) => of(new ArchiveFailureAction(errors)))
        );
      })
    )
  );

  favorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.FavoriteAction),
      map((action: FavoriteAction) => action.payload),
      switchMap((model: TaskModel) => {
        return this.taskService.favorite(model).pipe(
          map((task) => new FavoriteSuccessAction(task)),
          catchError((errors) => of(new FavoriteFailureAction(errors)))
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActionTypes.CreateAction),
      map((action: CreateAction) => action.payload),
      switchMap((model: TaskModel) => {
        return this.taskService.create(model).pipe(
          switchMap((task) => [
            // new CloseTaskFormMenu(),
            new CreateSuccessAction(task),
          ]),
          catchError((errors) => of(new CreateFailureAction(errors)))
        );
      })
    )
  );
}
