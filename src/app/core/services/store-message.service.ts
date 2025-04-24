import { Injectable } from "@angular/core";
import "rxjs";
import { select, Store } from "@ngrx/store";
import * as fromRoot from "../redux";
import "rxjs/add/observable/combineLatest";
import { MessageModel } from "../models/message.model";
import * as _ from "lodash";
import { combineLatest } from "rxjs";
import { filter, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class StoreMessageService {
  public limitVisible = 15;

  constructor(private store: Store<fromRoot.State>) {}

  /**
   * Список сообщений для чата в разрезе задачи
   */
  getMessagesByTaskId(taskId: string) {
    const messageList$ = this.store.pipe(
      select(fromRoot.getMessageEntitiesByTask(taskId))
    );
    const inviteList$ = this.store.pipe(select(fromRoot.getInviteEntities));

    return combineLatest(messageList$, inviteList$).pipe(
      filter(([messages, invites]) => invites.length > 0),
      map(([messages, invites]) => {
        messages.forEach((message) => {
          message.invite = _.find(invites, { userId: message.authorId as any });
        });
        const messageList = messages.slice(-this.limitVisible);
        const messageListHide =
          messages.length > this.limitVisible
            ? messages.slice(0, messages.length - this.limitVisible)
            : [];
        const messageListPinned = messages.filter(
          (item: MessageModel) => item.isPin === true
        );

        return {
          messageList: messageList,
          messageListHide: messageListHide,
          messageListPinned: messageListPinned,
        };
      })
    );
  }
}
