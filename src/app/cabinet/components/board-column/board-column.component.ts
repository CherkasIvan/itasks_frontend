import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {StatusModel} from '@core/models/status.model';
import {select, Store} from '@ngrx/store';
import {TaskModel} from '@core/models/task.model';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import * as fromRoot from '@core/redux';
import * as StatusAction from '@core/redux/status/status.actions';
import * as LayoutActions from '@core/redux/layout/layout.actions';
import * as TaskActions from '@core/redux/task/task.actions';
import {ActivatedRoute, Router} from '@angular/router';
import * as ProjectActions from '@core/redux/project/project.actions';
import {StoreTaskService} from '@core/services/store-task.service';

declare var jQuery: any;

@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.less'],
})
export class BoardColumnComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() model: StatusModel;
  @Input() statusId: string;
  modelCopy: StatusModel;
  items: TaskModel[] = [];
  allowUpdate = true;
  isShowMenu = false;
  isLoading = false;
  taskLoading$: Observable<any>;
  statusLoading$: Observable<any>;
  taskLoadingOrder$: Observable<any>;
  subscription$: Subscription = new Subscription;
  isAdmin = false;

  constructor(private store: Store<fromRoot.State>,
              private taskService: StoreTaskService,
              private elementRef: ElementRef,
              private route: ActivatedRoute,
              public router: Router) {
  }

  ngOnInit() {
    this.statusLoading$ = this.store.pipe(select(fromRoot.getStatusLoading));
    this.taskLoading$ = this.store.pipe(select(fromRoot.getTaskLoading));
    this.taskLoadingOrder$ = this.store.pipe(select(fromRoot.getTaskLoadingOrder));
    this.subscription$.add(this.taskLoading$
      .filter((loading) => loading === false)
      .subscribe(() => jQuery('.board-column__task-plus').css({display: 'flex'})));

    this.subscription$.add(this.statusLoading$.subscribe((loading) => this.isLoading = loading));
    this.subscription$.add(this
      .taskService
      .getTaskListByStatusId(this.statusId)
      .subscribe((items) => {
        if (this.allowUpdate) {
          this.items = items;
        }
      }));

    this.subscription$
      .add(this
        .store
        .pipe(select(fromRoot.getUserCanAdmin))
        .subscribe((isAdmin: boolean) => {
          this.isAdmin = isAdmin || false;
        }));

    this._copyModel();
  }

  ngAfterViewInit() {
    jQuery(this.elementRef.nativeElement.querySelector('.board-column__cards')).sortable({
      connectWith: '.board-column__cards',
      items: '.board-column__card',
      placeholder: 'card-placeholder',
      dropOnEmpty: true,
      forcePlaceholderSize: true,
      tolerance: 'pointer',
      start: (event, ui) => {
        jQuery('.board-column__task-plus').css({display: 'none'});
      },
      stop: (event, ui) => {
        setTimeout(() => jQuery('.board-column__task-plus').css({display: 'flex'}), 300);
      },
      update: (event, ui) => {
        const model = new TaskModel();
        model.setAttributes({
          id: ui.item.attr('taskid'),
          beforeId: ui.item.next().attr('taskid'),
          afterId: ui.item.prev().attr('taskid'),
          statusId: ui.item.parents('.board__column').attr('statusid')
        });
        this.store.dispatch(new TaskActions.OrderAction(model));
      }
    }).disableSelection();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onSaveStatus() {
    if (this.model.name !== this.modelCopy.name) {
      this.model.name = this.modelCopy.name;
      this.store.dispatch(new StatusAction.SaveAction(this.model));
    }
  }

  onEnterInputStatusName() {
    if (this.modelCopy.name !== '') {
      this.onSaveStatus();
    }
  }

  onBlurInputStatusName() {
    if (this.modelCopy.name === '') {
      this._copyModel();
    } else {
      this.onSaveStatus();
    }
  }

  onShowTaskForm(index, afterId = null, beforeId = null) {
    this.allowUpdate = false;
    // $event.preventDefault();
    // $event.stopPropagation();
    const model = new TaskModel();
    model.setAttributes({
      id: 'newTask',
      name: '',
      insertIndex: index,
      statusId: this.statusId,
      afterId: afterId,
      beforeId: beforeId,
    });
    this.items.splice(index, 0, model);
  }

  onToggleBackLog() {
    this.store.dispatch(new LayoutActions.ToggleBackLog());
  }

  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  close() {
    this.isShowMenu = false;
  }

  openTask(id: string) {
    if (id !== 'newTask') {
      this.router.navigate([{outlets: {task: ['view', id]}}], {
        relativeTo: this.route.parent,
        queryParamsHandling: 'merge'
      });
    }
  }

  protected _copyModel() {
    this.modelCopy = Object.assign({}, this.model);
  }
}
