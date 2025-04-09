import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { TaskModel } from "@core/models/task.model";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { FileService } from "@core/services/file.service";
import { StoreTaskService } from "@core/services/store-task.service";
import { CabinetComponent } from "../../cabinet.component";
import { AutoResizeDirective } from "@ux/directives/auto-resize.directive";
import { Subject } from "rxjs";
import { SocketService } from "@core/services/socket.service";
// import {ElectronService} from '@core/services/electron.service';
import * as MessageActions from "@core/redux/message/message.actions";
import * as TaskActions from "@core/redux/task/task.actions";
import * as fromRoot from "@core/redux";
import * as _ from "lodash";
import * as visibility from "visibilityjs";
import { StatusModel } from "@core/models/status.model";
import { combineLatest } from "rxjs/index";
import { filter, map } from "rxjs/operators";
import { NgClass } from "@angular/common";
import { AvatarSelectComponent } from "@ux/components/avatar-select/avatar-select.component";
import { TaskViewTagComponent } from "../task-view-tag/task-view-tag.component";
import { TaskViewCommentsComponent } from "../task-view-comments/task-view-comments.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StatusComponent } from "@ux/components/status/status.component";

@Component({
  selector: "app-task-view",
  templateUrl: "./task-view.component.html",
  styleUrls: ["./task-view.component.less"],
  imports: [
    NgClass,
    AvatarSelectComponent,
    TaskViewTagComponent,
    TaskViewCommentsComponent,
    StatusComponent,
    FormsModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskViewComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("scroll") scroll: ElementRef;
  @ViewChild("inputUploadFiles") inputUploadFiles: any;
  @ViewChild(AutoResizeDirective) formResize: AutoResizeDirective;

  newMessageSubject$ = new Subject();
  subscription$: Subscription = new Subscription();

  oldTask: TaskModel = new TaskModel();
  task: TaskModel = new TaskModel();

  files = [];
  isOpenStatusPopup = false;
  isOpenCalendarPopup = false;
  openTaskId: string;
  allowScrollDown = false;
  isOpenEditTaskForm = false;
  isOpenArchivePopup = false;
  private _isWindowFocus = true;

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

  @HostListener("window:focus", ["$event"])
  onFocus(event: any): void {
    this._isWindowFocus = true;
  }

  @HostListener("window:blur", ["$event"])
  onBlur(event: any): void {
    this._isWindowFocus = false;
  }

  constructor(
    private store: Store<fromRoot.State>,
    private socketService: SocketService,
    // private electronService: ElectronService,
    private fileService: FileService,
    private route: ActivatedRoute,
    private taskService: StoreTaskService,
    public cabinetComponent: CabinetComponent,
    public router: Router
  ) {
    // if (electronService.isElectron()) {
    //   electronService
    //     .remote
    //     .powerMonitor
    //     .on('resume', () => {
    //       if (this.openTaskId) {
    //         this._initData(this.openTaskId);
    //       }
    //     });
    // }

    /**
     * Подписываемся на открытую задачу
     * @type {Subscription}
     */
    this.subscription$.add(
      taskService
        .getOpenTask()
        .pipe(filter((task) => !!task))
        .subscribe((task) => {
          this.task = task;
          this.oldTask = { ...task } as TaskModel;
        })
    );

    /**
     * Подписываемся на обновление ID задачи в роутинге
     * @type {Subscription}
     */
    this.subscription$.add(
      combineLatest(route.paramMap, route.queryParamMap)
        .pipe(
          map(
            ([params, queryParams]) => params.get("id") || queryParams.get("id")
          ),
          filter((id) => !!id)
        )
        .subscribe((id) => {
          this.openTaskId = id;
          this._initData(id);
          socketService.openTask(id);
        })
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.scroll.nativeElement.scrollIntoView(false);
  }

  ngOnDestroy() {
    this.socketService.closeTask();
    this.store.dispatch(new TaskActions.CloseAction());
    this.subscription$.unsubscribe();
  }

  onChangeResponsible(responsibleId: string) {
    this.task.responsibleId = responsibleId;
    this.store.dispatch(new TaskActions.SaveAction(this.task));
  }

  onChangeStatus(status: StatusModel) {
    this.task.statusId = status.id;
    this.store.dispatch(new TaskActions.SaveAction(this.task));
    this.onCloseStatusPopup();
  }

  onChangeTags(tags: string[]) {
    this.task.tags = tags;
    this.store.dispatch(new TaskActions.SaveAction(this.task));
  }

  onChangeDeadline(date) {
    this.task.deadlineAt = date.mDate.toISOString();
    this.store.dispatch(new TaskActions.SaveAction(this.task));
    this.onCloseCalendarPopup();
  }

  onClearDeadline() {
    this.task.deadlineAt = "";
    this.store.dispatch(new TaskActions.SaveAction(this.task));
    this.onCloseCalendarPopup();
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
        .upload(file, "task", this.task.id, this.task.id)
        .subscribe(
          (event) => {
            file.index = i;
            if (event.type === HttpEventType.UploadProgress) {
              file.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              file.progress = 100;
              this.task.files.push(event.body);
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

  onFavorite() {
    this.task.isFavorite = !this.task.isFavorite;
    this.store.dispatch(new TaskActions.FavoriteAction(this.task));
  }

  onSave() {
    this.store.dispatch(new TaskActions.SaveAction(this.task));
  }

  onSaveName() {
    if (this.task.name !== this.oldTask.name) {
      this.onSave();
    }
  }

  onSaveContent() {
    if (this.task.body !== this.oldTask.body) {
      this.onSave();
    }
    this.isOpenEditTaskForm = false;
  }

  onClose() {
    if (this.cabinetComponent.layout === "board") {
      this.router.navigate([{ outlets: { task: null } }], {
        relativeTo: this.route.parent,
        queryParamsHandling: "merge",
      });
    } else {
      this.router.navigate([], {
        queryParams: { id: null },
        queryParamsHandling: "merge",
      });
    }
  }

  onOpenStatusPopup() {
    this.isOpenStatusPopup = true;
  }

  onCloseStatusPopup() {
    this.isOpenStatusPopup = false;
  }

  onOpenCalendarPopup() {
    this.isOpenCalendarPopup = true;
  }

  onCloseCalendarPopup() {
    this.isOpenCalendarPopup = false;
  }

  onScroll() {
    const nativeElement = this.scroll.nativeElement;
    const scrollTop = nativeElement.scrollTop;
    const scrollHeight = nativeElement.scrollHeight;
    const clientHeight = nativeElement.clientHeight;
    const atBottom = scrollHeight - scrollTop === clientHeight;
    this.allowScrollDown =
      atBottom && !visibility.hidden() && this._isWindowFocus;

    if (this.allowScrollDown && this.task.countNotifications) {
      this.task.countNotifications = 0;
      this.store.dispatch(new TaskActions.ClearNotificationsAction(this.task));
    }
  }

  onOpenTaskForm() {
    this.isOpenEditTaskForm = true;
  }

  onComplete() {
    if (!this.task.isComplete) {
      this.task.isComplete = !this.task.isComplete;
      this.store.dispatch(new TaskActions.SaveAction(this.task));
    }
    this.isOpenArchivePopup = true;
  }

  onCloseArchivePopup() {
    this.isOpenArchivePopup = false;
  }

  private _initData(id) {
    this.store.dispatch(new TaskActions.OpenAction(id));
    this.store.dispatch(new TaskActions.FindOneAction(id));
    this.store.dispatch(new MessageActions.SearchAction(id));
  }

  public scrollToBottom() {
    if (this.allowScrollDown && this._isWindowFocus) {
      try {
        this.scroll.nativeElement.scrollTop =
          this.scroll.nativeElement.scrollHeight;
      } catch (err) {}
    }
  }
}
