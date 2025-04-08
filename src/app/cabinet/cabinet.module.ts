/**
 * Core
 */
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
/**
 * Modules
 */
import {UxModule} from '@ux/ux.module';
import {CabinetRoutingModule} from './cabinet-routing.module';
import {ClickOutsideModule} from 'ng-click-outside';
import {FilterPipeModule} from 'ngx-filter-pipe';

/**
 * Components
 */
import {CabinetComponent} from './cabinet.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {SidebarUserComponent} from './components/sidebar-user/sidebar-user.component';
import {MenuComponent} from './components/menu/menu.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {ViewTableComponent} from './components/view-table/view-table.component';
import {TaskViewComponent} from './components/task-view/task-view.component';
import {ViewBoardComponent} from './components/view-board/view-board.component';
import {BoardColumnComponent} from './components/board-column/board-column.component';
import {BoardComponent} from './components/board/board.component';
import {BoardCardComponent} from './components/board-card/board-card.component';
import {BoardColumnMenuComponent} from './components/board-column-menu/board-column-menu.component';
import {FastSearchComponent} from './components/fast-search/fast-search.component';
import {ProjectMenuComponent} from './components/project-menu/project-menu.component';
import {ProjectFormComponent} from './components/project-form/project-form.component';
import {SelectColorComponent} from './components/select-color/select-color.component';
import {SelectIconComponent} from './components/select-icon/select-icon.component';
import {BurgerComponent} from './components/burger/burger.component';
import {SidebarFilterComponent} from './components/sidebar-filter/sidebar-filter.component';
import {TaskPopupComponent} from './components/task-popup/task-popup.component';
import {TaskViewTagComponent} from './components/task-view-tag/task-view-tag.component';
import {TaskViewCheckListComponent} from './components/task-view-check-list/task-view-check-list.component';
import {TaskViewCommentsComponent} from './components/task-view-comments/task-view-comments.component';
import {TaskViewFilesComponent} from './components/task-view-files/task-view-files.component';
import {TaskViewFollowersComponent} from './components/task-view-followers/task-view-followers.component';
import {TaskViewCommentsTimeComponent} from './components/task-view-comments-time/task-view-comments-time.component';
import {TaskViewCommentFormFileComponent} from './components/task-view-comment-form-file/task-view-comment-form-file.component';
import {TaskViewCommentFormTimeComponent} from './components/task-view-comment-form-time/task-view-comment-form-time.component';
import {TaskViewCommentItemComponent} from './components/task-view-comment-item/task-view-comment-item.component';
import {TaskViewCommentLinkPreviewComponent} from './components/task-view-comment-link-preview/task-view-comment-link-preview.component';
import {TaskViewCommentsFormComponent} from './components/task-view-comments-form/task-view-comments-form.component';
import {AutoFocusModule} from '@ux/directives/auto-focus/auto-focus.module';
import {SettingsPopupComponent} from './components/settings-popup/settings-popup.component';
import {SettingInviteComponent} from './components/setting-invite/setting-invite.component';
import {SettingTagComponent} from './components/setting-tag/setting-tag.component';
import {SettingTagListComponent} from './components/setting-tag/setting-tag-list/setting-tag-list.component';
import {SettingTagItemComponent} from './components/setting-tag/setting-tag-item/setting-tag-item.component';
import {LinkyModule} from 'angular-linky';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {FilterPopupComponent} from './components/filter-popup/filter-popup.component';
import {MarkdownModule, MarkedOptions, MarkedRenderer} from 'ngx-markdown';
import {TaskViewArchivePopupComponent} from './components/task-view-archive-popup/task-view-archive-popup.component';
import {FilterControlsComponent} from '@cabinet/components/filter-controls/filter-controls.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';


export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();
  const linkRenderer = renderer.link;

  renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);
    return html.replace(/^<a /, '<a role="link" tabindex="0" target="_blank" rel="nofollow noopener noreferrer" ');
  };

  return {
    renderer,
    gfm: true,
    tables: false,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  };
}

@NgModule({
  imports: [
    FormsModule,
    CabinetRoutingModule,
    UxModule,
    ClickOutsideModule,
    CommonModule,
    ReactiveFormsModule,
    FilterPipeModule,
    AutoFocusModule,
    LinkyModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    }),
  ],
  declarations: [
    CabinetComponent,
    SidebarComponent,
    HeaderComponent,
    SidebarUserComponent,
    MenuComponent,
    TaskListComponent,
    ViewTableComponent,
    TaskViewComponent,
    ViewBoardComponent,
    FilterControlsComponent,
    BoardColumnComponent,
    BoardComponent,
    BoardCardComponent,
    BoardColumnMenuComponent,
    FastSearchComponent,
    ProjectMenuComponent,
    ProjectFormComponent,
    SelectColorComponent,
    SelectIconComponent,
    BurgerComponent,
    SidebarFilterComponent,
    TaskPopupComponent,
    TaskViewTagComponent,
    TaskViewCheckListComponent,
    TaskViewCommentsComponent,
    TaskViewFilesComponent,
    TaskViewFollowersComponent,
    TaskViewCommentsTimeComponent,
    TaskViewCommentFormFileComponent,
    TaskViewCommentFormTimeComponent,
    TaskViewCommentItemComponent,
    TaskViewCommentLinkPreviewComponent,
    TaskViewCommentsFormComponent,
    SettingsPopupComponent,
    SettingInviteComponent,
    SettingTagComponent,
    SettingTagListComponent,
    SettingTagItemComponent,
    ChangePasswordComponent,
    FilterPopupComponent,
    TaskViewArchivePopupComponent,
  ],
  exports: [
    ProjectFormComponent,
    ProjectMenuComponent,
  ],
})
export class CabinetModule {
}
