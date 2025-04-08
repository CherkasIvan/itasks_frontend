import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Store} from '@ngrx/store';
import {
  CreateAction, CreateFailureAction, CreateSuccessAction, DeleteAction, DeleteFailureAction, DeleteSuccessAction,
  InviteActionTypes, ResendEmailAction, ResendEmailFailureAction, ResendEmailSuccessAction, SaveFailureAction,
  SaveSuccessAction,
  SearchAction,
  SearchFailureAction,
  SearchSuccessAction
} from './invite.actions';
import {InviteService} from '../../services/invite.service';
import * as fromRoot from '../../redux/index';

@Injectable()
export class InviteEffects {

  constructor(private store: Store<fromRoot.State>,
              private actions$: Actions,
              private inviteService: InviteService) {
  }

  @Effect()
  search$ = this.actions$.pipe(
    ofType(InviteActionTypes.SearchAction),
    map((action: SearchAction) => action.payload),
    switchMap((params) => {
        return this.inviteService
          .findAll(params)
          .pipe(
            map((invites) => new SearchSuccessAction(invites)),
            catchError((errors) => of(new SearchFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  resendEmail$ = this.actions$.pipe(
    ofType(InviteActionTypes.ResendEmailAction),
    map((action: ResendEmailAction) => action.payload),
    switchMap((id: string) => {
        return this.inviteService
          .resend(id)
          .pipe(
            map(_ => new ResendEmailSuccessAction()),
            catchError((errors) => of(new ResendEmailFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  create$ = this.actions$.pipe(
    ofType(InviteActionTypes.CreateAction),
    map((action: CreateAction) => action.payload),
    switchMap((params) => {
        return this.inviteService
          .create(params)
          .pipe(
            map((invite) => new CreateSuccessAction(invite)),
            catchError((errors) => of(new CreateFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  save$ = this.actions$.pipe(
    ofType(InviteActionTypes.SaveAction),
    map((action: CreateAction) => action.payload),
    switchMap((params) => {
        return this.inviteService
          .save(params)
          .pipe(
            map((invite) => new SaveSuccessAction(invite)),
            catchError((errors) => of(new SaveFailureAction(errors)))
          );
      }
    )
  );

  @Effect()
  delete$ = this.actions$.pipe(
    ofType(InviteActionTypes.DeleteAction),
    map((action: DeleteAction) => action.payload),
    switchMap((id) => {
        return this.inviteService
          .delete(id)
          .pipe(
            map((invite) => new DeleteSuccessAction(invite)),
            catchError((errors) => of(new DeleteFailureAction(errors)))
          );
      }
    )
  );
}
