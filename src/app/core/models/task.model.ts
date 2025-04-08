import {BaseModel} from './base.model';
import {InviteModel} from './invite.model';
import {StatusModel} from './status.model';
import {UserModel} from './user.model';
import {getUserId} from '@core/utils/getUserId';
import {TagModel} from '@core/models/tag.model';
import {getSearchQuerys} from '@core/utils/query-builder';
import {Params} from '@angular/router';
import * as moment from 'moment';

export interface NotificationInterface {
  userId: string;
  count: number;
}

export class TaskModel extends BaseModel {
  id: string;
  name: string;
  body: string;
  projectId: string;
  responsible: InviteModel;
  responsibleId: string;
  status: StatusModel;
  statusId: string;
  authorId: string;
  deadlineAt: string;
  deadlineStatus: string;
  spentTime: number;
  countMessages: number;
  followers: string[] = [];
  notifications: NotificationInterface[] = [];
  followersUsers: UserModel[] = [];
  favorites: string[] = [];
  likes: any[] = [];
  tags: string[] = [];
  tagList: TagModel[] = [];
  checkList: any[] = [];
  createdAt: string;
  completedAt: string;
  archivedAt: string;
  updatedAt: string;
  afterId: string;
  beforeId: string;
  files: any[] = [];
  order: number;
  countNotifications: number;
  insertIndex: number;
  isComplete: boolean;
  isArchive: boolean;
  userIdArchive: string;
  userIdComplete: string;
  userArchive: InviteModel;
  userComplete: InviteModel;

  private _userId: string | null;

  getDeadlineCssClass() {
    let deadlineClass = '';

    if (this.deadlineAt) {
      const nowStartDay = moment().startOf('day');
      const nowEndDay = moment().endOf('day');
      const deadlineAt = moment(this.deadlineAt).valueOf();

      if (deadlineAt >= nowStartDay.valueOf() && deadlineAt <= nowEndDay.valueOf()) {
        deadlineClass = 'deadline__color_soon';
      } else if (deadlineAt < nowStartDay.valueOf()) {
        deadlineClass = 'deadline__color_overdue';
      }
    }

    return deadlineClass;
  }

  get isFavorite() {
    return this.favorites.indexOf(this._getUserId()) > -1;
  }

  set isFavorite(value) {
    const userId = this._getUserId();

    if (value) {
      this.favorites.push(userId);
    } else {
      this.favorites.splice(this.favorites.indexOf(userId), 1);
    }
  }

  private _getUserId() {
    if (!this._userId) {
      this._userId = getUserId();
    }

    return this._userId;
  }
}
