import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as fromRoot from "../redux";
import "rxjs/add/observable/combineLatest";
import { TaskModel } from "../models/task.model";
import { combineLatest, Observable } from "rxjs";
import { filter, map } from "rxjs";
import * as _ from "lodash";

@Injectable({
  providedIn: "root",
})
export class StoreTaskService {
  constructor(private store: Store<fromRoot.State>) {}

  getOpenTask() {
    return this._prepareOne(this.store.pipe(select(fromRoot.getTaskOpen)));
  }

  getTaskListByStatusId(statusId) {
    return this._prepareAll(
      this.store.pipe(select(fromRoot.getTaskEntitiesByStatus(statusId)))
    );
  }

  getTaskList() {
    return this._prepareAll(this.store.pipe(select(fromRoot.getTaskEntities)));
  }

  private _prepareAll(taskList$: Observable<TaskModel[]>) {
    const inviteList$ = this.store.pipe(select(fromRoot.getInviteEntities));
    const statusList$ = this.store.pipe(select(fromRoot.getStatusEntities));
    const tagList$ = this.store.pipe(select(fromRoot.getTagEntities));

    return combineLatest(taskList$, inviteList$, statusList$, tagList$).pipe(
      filter(
        ([taskList, inviteList, statusList, tagList]) =>
          inviteList.length > 0 && statusList.length > 0
      ),
      map(([taskList, inviteList, statusList, tagList]) => {
        if (taskList && inviteList && statusList && tagList) {
          taskList.forEach((task: TaskModel) => {
            if (task.responsibleId) {
              task.responsible = _.find(inviteList, {
                userId: task.responsibleId as any,
              });
            }

            if (task.statusId) {
              task.status = _.find(statusList, { id: task.statusId as any });
            }

            task.tagList = [];
            task.tags.forEach((tagId) => {
              const tag = _.find(tagList, { id: tagId as any });
              if (tag) {
                task.tagList.push(tag);
              }
            });
          });
        }

        return taskList;
      })
    );
  }

  private _prepareOne(task$: Observable<TaskModel>) {
    const inviteList$ = this.store.pipe(select(fromRoot.getInviteEntities));
    const statusList$ = this.store.pipe(select(fromRoot.getStatusEntities));
    const tagList$ = this.store.pipe(select(fromRoot.getTagEntities));

    return combineLatest(task$, inviteList$, statusList$, tagList$).pipe(
      filter(
        ([task, inviteList, statusList, tagList]) =>
          task && inviteList.length > 0 && statusList.length > 0
      ),
      map(([task, inviteList, statusList, tagList]) => {
        if (task.responsibleId) {
          task.responsible = _.find(inviteList, {
            userId: task.responsibleId as any,
          });
        }

        if (task.userIdArchive) {
          task.userArchive = _.find(inviteList, {
            userId: task.userIdArchive as any,
          });
        }

        if (task.userIdComplete) {
          task.userComplete = _.find(inviteList, {
            userId: task.userIdComplete as any,
          });
        }

        task.status = _.find(statusList, { id: task.statusId as any });

        task.followersUsers = [];
        task.followers.forEach((followerId) => {
          const follower = _.find(inviteList, { userId: followerId as any });
          if (follower) {
            task.followersUsers.push(follower.user);
          }
        });

        task.tagList = [];
        task.tags.forEach((tagId) => {
          const tag = _.find(tagList, { id: tagId as any });
          if (tag) {
            task.tagList.push(tag);
          }
        });

        return task;
      })
    );
  }
}
