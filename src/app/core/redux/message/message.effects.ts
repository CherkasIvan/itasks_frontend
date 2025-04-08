import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {
  CreateAction,
  CreateFailureAction,
  CreateSuccessAction,
  DeleteAction,
  DeleteSuccessAction,
  LikeFailureAction,
  LikeSuccessAction,
  MessageActionTypes,
  PinFailureAction, PinSuccessAction,
  SaveAction,
  SaveFailureAction,
  SaveSuccessAction,
  SearchAction,
  SearchFailureAction,
  SearchSuccessAction,
} from './message.actions';

import {Action, Store} from '@ngrx/store';
import {MessageService} from '../../services/message.service';
import {MessageModel} from '../../models/message.model';
import * as fromRoot from '../../redux/index';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class MessageEffects {

  constructor(private store: Store<fromRoot.State>,
              private actions$: Actions,
              private messageService: MessageService) {
  }

  @Effect()
  search$ = this.actions$.pipe(
    ofType(MessageActionTypes.SearchAction),
    map((action: SearchAction) => action.payload),
    switchMap((taskId: string) => {
        return this.messageService
          .findAll(taskId)
          .pipe(
            map((message) => new SearchSuccessAction(message)),
            catchError((errors) => of(new SearchFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  save$ = this.actions$.pipe(
    ofType(MessageActionTypes.SaveAction),
    map((action: SaveAction) => action.payload),
    switchMap((model: MessageModel) => {
        return this.messageService
          .save(model)
          .pipe(
            map((message) => new SaveSuccessAction(message)),
            catchError((errors) => of(new SaveFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  create$ = this.actions$.pipe(
    ofType(MessageActionTypes.CreateAction),
    map((action: CreateAction) => action.payload),
    switchMap((model: MessageModel) => {
        return this.messageService
          .create(model)
          .pipe(
            map((message) => new CreateSuccessAction(message)),
            catchError((errors) => of(new CreateFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  like$ = this.actions$.pipe(
    ofType(MessageActionTypes.LikeAction),
    map((action: CreateAction) => action.payload),
    switchMap((model: MessageModel) => {
        return this.messageService
          .like(model)
          .pipe(
            map((message) => new LikeSuccessAction(message)),
            catchError((errors) => of(new LikeFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  pin$ = this.actions$.pipe(
    ofType(MessageActionTypes.PinAction),
    map((action: CreateAction) => action.payload),
    switchMap((model: MessageModel) => {
        return this.messageService
          .pin(model)
          .pipe(
            map((message) => new PinSuccessAction(message)),
            catchError((errors) => of(new PinFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType(MessageActionTypes.DeleteAction),
    map((action: DeleteAction) => action.payload),
    switchMap((model: MessageModel) => {
        return this.messageService
          .destroy(model)
          .pipe(
            map(() => new DeleteSuccessAction(model)),
            catchError((errors) => of(new CreateFailureAction(errors)))
          );
      }
    )
  );
}
