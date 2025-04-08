import {Injectable, NgZone} from '@angular/core';
import {Store} from '@ngrx/store';
import {MessageModel} from '@core/models/message.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ImagePreviewPipe} from '@ux/pipes/image-preview.pipe';
import {getUserId} from '@core/utils/getUserId';
import {SetOnlineInterface} from '@core/models/invite.model';
import {TaskModel} from '@core/models/task.model';
import {TaskQueryService} from '@core/services/query/task.query.service';
import * as visibility from 'visibilityjs';
import * as TaskActions from '@core/redux/task/task.actions';
import * as fromRoot from '@core/redux';
import * as MessageActions from '@core/redux/message/message.actions';
import * as InviteActions from '@core/redux/invite/invite.actions';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private _taskId;
  private _projectId;

  constructor(private socket: Socket,
              private store: Store<fromRoot.State>,
              private zone: NgZone,
              private route: ActivatedRoute,
              private imagePreviewPipe: ImagePreviewPipe,
              private router: Router,
              private taskQueryService: TaskQueryService) {
    this.socket.on('authenticated', _ => {
      console.log('Авторизован');
    });

    this.socket.on('[Task] Refresh Chats', _ => {
      this.store.dispatch(new TaskActions.SearchNotificationAction());
    });

    // Добавить или обновить задачу в сайдбаре чата
    this.socket.on('[Chat] Update Task', (data) => {
      const task = (new TaskModel()).setAttributes(data);
      this.store.dispatch(new TaskActions.UpdateNotificationAction(task));
    });

    this.socket.on('[Task] Refresh', _ => {
      this.taskQueryService.reload();
    });

    this.socket.on(`[Message] Added`, (data) => {
      const message = (new MessageModel()).setAttributes(data);

      const userId = getUserId();
      if (message.authorId !== userId) {
        if (visibility.hidden() && message.followers.indexOf(userId) > -1) {
          let imageUrl = null;

          if (message.author.avatar) {
            imageUrl = this.imagePreviewPipe.transform(message.author.avatar, 150, 150, true);
          }

          const notification = new Notification(`${message.author.firstName} ${message.author.lastName}`, {
            body: message.message,
            icon: imageUrl
          });

          notification.onclick = _ => {
            this.zone.run(() => {
              this.router.navigate(['/cabinet', message.projectId, 'load', {outlets: {task: ['view', message.taskId]}}]);
            });
          };
        }

        if (data.taskId === this._taskId) {
          this.store.dispatch(new MessageActions.CreateSuccessAction(message));
        }
      }
    });

    this.socket.on(`[Message] Updated`, (data) => {
      const message = (new MessageModel()).setAttributes(data);

      if (data.taskId === this._taskId) {
        this.store.dispatch(new MessageActions.SaveSuccessAction(message));
      }
    });

    this.socket.on(`[Message] Deleted`, (data) => {
      const message = (new MessageModel()).setAttributes(data);

      if (message.authorId !== getUserId()) {
        if (data.taskId === this._taskId) {
          this.store.dispatch(new MessageActions.DeleteSuccessAction(message));
        }
      }
    });
  }

  listen(token) {
    this.socket.emit('authentication', {accessToken: token});
  }

  listenOnline(projectId) {
    if (this._projectId && this._projectId !== projectId) {
      this.socket.removeListener(`[User] Online:${this._projectId}`);
    }
    this._projectId = projectId;
    this.socket.on(`[User] Online:${projectId}`, (data: SetOnlineInterface[]) => {
      this.store.dispatch(new InviteActions.SetOnlineAction(data));
    });
  }

  openTask(taskId) {
    this.closeTask();
    this._taskId = taskId;
  }

  closeTask() {
    this.socket.removeListener(`[Message] Added:${this._taskId}`);
  }
}
