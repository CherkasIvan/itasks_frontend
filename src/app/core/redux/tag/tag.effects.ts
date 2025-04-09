import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { TagService } from "../../services/tag.service";
import { TagModel } from "../../models/tag.model";
import {
  CreateAction,
  CreateFailureAction,
  CreateSuccessAction,
  DeleteAction,
  DeleteSuccessAction,
  SaveAction,
  SaveFailureAction,
  SaveSuccessAction,
  SearchFailureAction,
  SearchSuccessAction,
  TagActionTypes,
} from "./tag.actions";

import { Store } from "@ngrx/store";
import * as fromRoot from "@core/redux/index";

@Injectable()
export class TagEffects {
  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
    private tagService: TagService
  ) {}

  search$ = this.actions$.pipe(
    ofType(TagActionTypes.SearchAction),
    switchMap(() => {
      return this.tagService.findAll().pipe(
        map((tag) => new SearchSuccessAction(tag)),
        catchError((errors) => of(new SearchFailureAction(errors)))
      );
    })
  );

  save$ = this.actions$.pipe(
    ofType(TagActionTypes.SaveAction),
    map((action: SaveAction) => action.payload),
    switchMap((model: TagModel) => {
      return this.tagService.save(model).pipe(
        map((tag) => new SaveSuccessAction(tag)),
        catchError((errors) => of(new SaveFailureAction(errors)))
      );
    })
  );

  create$ = this.actions$.pipe(
    ofType(TagActionTypes.CreateAction),
    map((action: CreateAction) => action.payload),
    switchMap((model: TagModel) => {
      return this.tagService.create(model).pipe(
        map((tag) => new CreateSuccessAction(tag)),
        catchError((errors) => of(new CreateFailureAction(errors)))
      );
    })
  );

  delete$ = this.actions$.pipe(
    ofType(TagActionTypes.DeleteAction),
    map((action: DeleteAction) => action.payload),
    switchMap((model: TagModel) => {
      return this.tagService.delete(model).pipe(
        map((_) => new DeleteSuccessAction(model.id)),
        catchError((errors) => of(new SaveFailureAction(errors)))
      );
    })
  );
}
