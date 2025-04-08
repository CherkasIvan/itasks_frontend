import {AfterViewChecked, Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MessageModel} from '@core/models/message.model';
import {TaskViewComponent} from '../task-view/task-view.component';
import {StoreMessageService} from '@core/services/store-message.service';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';
import * as fromRoot from '@core/redux';

@Component({
  selector: 'app-task-view-comments',
  templateUrl: './task-view-comments.component.html',
  styleUrls: ['./task-view-comments.component.less'],
})
export class TaskViewCommentsComponent implements OnInit, AfterViewChecked, OnDestroy {
  @Input() newMessageSubject: Subject<MessageModel>;

  @Input()
  set taskId(taskId) {
    if (taskId) {
      this.subscription$.add(this
        .storeMessage
        .getMessagesByTaskId(taskId)
        .subscribe((messages) => {
          this.messageList = messages.messageList;
          this.messageListHide = messages.messageListHide;
          this.messageListPinned = messages.messageListPinned;

          if (this._isFirstLoadingComments === false) {
            // this.taskView.scrollToBottom(true);
            this.taskView.allowScrollDown = true;
          } else {
            this._isFirstLoadingComments = true;
          }
        }));
    }
  }

  messageListHide: MessageModel[] = [];
  messageList: MessageModel[] = [];
  messageListPinned: MessageModel[] = [];
  isShowMoreMessage = false;
  subscription$: Subscription = new Subscription;
  private _isFirstLoadingComments = true;

  constructor(private store: Store<fromRoot.State>,
              private taskView: TaskViewComponent,
              private storeMessage: StoreMessageService) {
  }

  ngOnInit() {
    this.subscription$.add(this.newMessageSubject.subscribe((message) => {
      if (this.messageList.length >= this.storeMessage.limitVisible) {
        this.messageList.splice(0, 1);
      }
      this.messageList.push(message);
      this.taskView.allowScrollDown = true;
    }));
  }

  ngAfterViewChecked() {
    this.taskView.scrollToBottom();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  showMoreMessage() {
    this.isShowMoreMessage = true;
  }

  hideMoreMessage() {
    this.isShowMoreMessage = false;
  }
}
