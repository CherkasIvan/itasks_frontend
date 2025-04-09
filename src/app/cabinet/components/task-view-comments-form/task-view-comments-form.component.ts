import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MessageModel } from "@core/models/message.model";
import * as MessageActions from "@core/redux/message/message.actions";
import * as fromRoot from "@core/redux";
import { select, Store } from "@ngrx/store";
import { FileService } from "@core/services/file.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Subscription } from "rxjs";
import * as _ from "lodash";
import { CabinetComponent } from "../../cabinet.component";
import { TaskViewComponent } from "../task-view/task-view.component";
import { getUserId } from "@core/utils/getUserId";
import { getUser } from "@core/utils/getUser";
import { InviteModel } from "@core/models/invite.model";
import { StoreMessageService } from "@core/services/store-message.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-task-view-comments-form",
  templateUrl: "./task-view-comments-form.component.html",
  styleUrls: ["./task-view-comments-form.component.less"],
  imports: [FormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewCommentsFormComponent implements OnInit, OnDestroy {
  @ViewChild("inputUploadFiles") inputUploadFiles: any;

  private _taskId: string;

  @Input()
  set taskId(taskId) {
    this._taskId = taskId;
    this._initMessageModel();
  }

  get taskId(): string {
    return this._taskId;
  }

  messageOrigin: MessageModel;
  message: MessageModel = new MessageModel();
  files = [];
  isOpenTimeForm = false;
  subscription$: Subscription = new Subscription();

  @HostListener("dragover", ["$event"])
  onDragOver($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  @HostListener("drop", ["$event"])
  onDrop($event) {
    event.preventDefault();
    event.stopPropagation();
    if ($event.dataTransfer.files.length) {
      this.onFileUpload($event.dataTransfer.files);
    }
  }

  constructor(
    public cabinetComponent: CabinetComponent,
    private store: Store<fromRoot.State>,
    private fileService: FileService,
    private storeMessage: StoreMessageService,
    private taskView: TaskViewComponent
  ) {
    this.subscription$.add(
      this.store
        .pipe(select(fromRoot.getMessageEdit))
        .subscribe((message: MessageModel) => {
          if (message) {
            this.messageOrigin = Object.assign({}, message);
            this.message = Object.assign({}, message);
          }
        })
    );
  }

  ngOnInit() {
    this._initMessageModel();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onSubmit($event) {
    $event.preventDefault();
    if (!this.message.message.length) {
      return false;
    } else if (this.message.id) {
      this.store.dispatch(new MessageActions.SaveAction(this.message));
    } else {
      this.message.authorId = getUserId();
      this.message.invite = new InviteModel();
      this.message.invite.userId = this.message.authorId;
      this.message.invite.user = getUser();
      this.message.createdAt = new Date().toISOString();
      this.taskView.newMessageSubject$.next(this.message);
      this.store.dispatch(new MessageActions.CreateAction(this.message));
    }
    this._initMessageModel();
  }

  onPasteFile($event) {
    if ($event.clipboardData.files.length) {
      $event.preventDefault();
      this.onFileUpload($event.clipboardData.files);
    }
  }

  onFileUpload(files) {
    for (let i = 0; files.length > i; i++) {
      this.files.push(files[i]);
    }

    this.inputUploadFiles.nativeElement.value = "";

    this.files.forEach((file, i) => {
      file.progress = 0;
      file.isError = false;
      file.error = null;

      const subscription = this.fileService
        .upload(file, "comment", this.taskId)
        .subscribe(
          (event) => {
            file.index = i;
            if (event.type === HttpEventType.UploadProgress) {
              file.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              file.progress = 100;
              this.message.files.push(event.body);
              const index = _.findIndex(this.files, { name: file.name });
              this.files.splice(index, 1);
            }
          },
          (error) => {
            file.error = error.error.file;
            file.isError = true;
          }
        );

      file.subscription = subscription;
      this.subscription$.add(subscription);
    });
  }

  onSetTime(time) {
    this.message.time = time;
    this.isOpenTimeForm = false;
  }

  onCloseTimeForm() {
    this.isOpenTimeForm = false;
  }

  onOpenTimeForm() {
    this.isOpenTimeForm = true;
  }

  onCloseEdit() {
    this.store.dispatch(new MessageActions.SetEditId(null));
    this._initMessageModel();
  }

  onClearTime() {
    this.isOpenTimeForm = false;
    this.message.time = null;
  }

  onStopUploadAndDeleteFile(file: any) {
    const index = _.findIndex(this.files, { name: file.name });
    this.files[index].subscription.unsubscribe();
    this.files.splice(index, 1);
  }

  private _initMessageModel() {
    this.message = new MessageModel();
    this.message.taskId = this.taskId;
    this.messageOrigin = null;
  }
}
