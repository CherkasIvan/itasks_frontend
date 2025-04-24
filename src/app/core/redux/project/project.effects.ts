import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { ProjectService } from "../../services/project.service";
import { ProjectModel } from "../../models/project.model";
import {
  CreateAction,
  CreateFailureAction,
  CreateSuccessAction,
  DeleteAction,
  ProjectActionTypes,
  SaveAction,
  SaveFailureAction,
  SaveSuccessAction,
  SearchFailureAction,
  SearchSuccessAction,
  RestoreAction,
  RestoreSuccessAction,
  RestoreFailureAction,
} from "./project.actions";
import { CloseProjectFormMenu, CloseProjectMenu } from "../popup/popup.actions";
import { Store } from "@ngrx/store";
import * as fromRoot from "../../redux/index";
import { StatusClearAction } from "@core/redux/status/status.actions";
import { TaskClearAction } from "@core/redux/task/task.actions";
import { TagClearAction } from "@core/redux/tag/tag.actions";
import { MessageClearAction } from "@core/redux/message/message.actions";

@Injectable()
export class ProjectEffects {
  constructor(
    private store: Store<fromRoot.State>,
    private actions$: Actions,
    private projectService: ProjectService
  ) {}

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.SearchAction),
      switchMap(() => {
        return this.projectService.findAll().pipe(
          map((projects) => new SearchSuccessAction(projects)),
          catchError((errors) => of(new SearchFailureAction(errors)))
        );
      })
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.SaveAction),
      map((action: SaveAction) => action.payload),
      switchMap((model: ProjectModel) => {
        return this.projectService.save(model).pipe(
          switchMap((project) => [
            new CloseProjectFormMenu(),
            new SaveSuccessAction(project),
          ]),
          catchError((errors) => of(new SaveFailureAction(errors)))
        );
      })
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.CreateAction),
      map((action: CreateAction) => action.payload),
      switchMap((model: ProjectModel) => {
        return this.projectService.create(model).pipe(
          switchMap((project) => [
            new CloseProjectFormMenu(),
            new CreateSuccessAction(project),
          ]),
          catchError((errors) => of(new CreateFailureAction(errors)))
        );
      })
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.DeleteAction),
      map((action: DeleteAction) => action.payload),
      switchMap((model: ProjectModel) => {
        return this.projectService.delete(model).pipe(
          switchMap((project) => [
            new CloseProjectMenu(),
            new SaveSuccessAction(project),
          ]),
          catchError((errors) => of(new SaveFailureAction(errors)))
        );
      })
    )
  );

  restore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.RestoreAction),
      map((action: RestoreAction) => action.payload),
      switchMap((model: ProjectModel) => {
        return this.projectService.restore(model).pipe(
          switchMap((project) => [
            new CloseProjectMenu(),
            new RestoreSuccessAction(project),
          ]),
          catchError((errors) => of(new RestoreFailureAction(errors)))
        );
      })
    )
  );

  select$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectActionTypes.SelectAction),
      switchMap(() => [
        new TaskClearAction(),
        new MessageClearAction(),
        new TagClearAction(),
        new StatusClearAction(),
      ])
    )
  );
}
