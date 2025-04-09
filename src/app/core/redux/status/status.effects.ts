import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { StatusService } from "../../services/status.service";
import { StatusModel } from "../../models/status.model";
import {
  CreateAction,
  CreateFailureAction,
  CreateSuccessAction,
  DeleteAction,
  StatusActionTypes,
  SaveAction,
  SaveFailureAction,
  SaveSuccessAction,
  SearchFailureAction,
  SearchSuccessAction,
  SortSuccessAction,
  SortFailureAction,
  SortAction,
  DeleteSuccessAction,
  DeleteFailureAction,
} from "./status.actions";

import { Store } from "@ngrx/store";
import * as fromRoot from "../../redux/index";
import { StatusSortModel } from "../../models/status-sort.model";

@Injectable()
export class StatusEffects {
  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
    private statusService: StatusService
  ) {}

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatusActionTypes.SearchAction),
      switchMap(() => {
        return this.statusService.findAll().pipe(
          map((status) => new SearchSuccessAction(status)),
          catchError((errors) => of(new SearchFailureAction(errors)))
        );
      })
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatusActionTypes.SaveAction),
      map((action: SaveAction) => action.payload),
      switchMap((model: StatusModel) => {
        return this.statusService.save(model).pipe(
          map((status) => new SaveSuccessAction(status)),
          catchError((errors) => of(new SaveFailureAction(errors)))
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatusActionTypes.CreateAction),
      map((action: CreateAction) => action.payload),
      switchMap((model: StatusModel) => {
        return this.statusService.create(model).pipe(
          map((status) => new CreateSuccessAction(status)),
          catchError((errors) => of(new CreateFailureAction(errors)))
        );
      })
    )
  );

  sort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatusActionTypes.SortAction),
      map((action: SortAction) => action.payload),
      switchMap((model: StatusSortModel) => {
        return this.statusService.sort(model).pipe(
          map((status) => new SortSuccessAction(status)),
          catchError((errors) => of(new SortFailureAction(errors)))
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StatusActionTypes.DeleteAction),
      map((action: DeleteAction) => action.payload),
      switchMap((model: StatusModel) => {
        return this.statusService.delete(model).pipe(
          map(() => new DeleteSuccessAction(model.id)),
          catchError((errors) => of(new DeleteFailureAction(errors)))
        );
      })
    )
  );
}
