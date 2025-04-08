import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ClickOutsideModule} from 'ng-click-outside';
import {SelectComponent} from './components/select/select.component';
import {PopupUserComponent} from './components/select-popup/popup-user/popup-user.component';
import {PopupStatusComponent} from './components/select-popup/popup-status/popup-status.component';
import {SelectHeaderUserComponent} from './components/select/select-header-user/select-header-user.component';
import {AvatarComponent} from './components/avatar/avatar.component';
import {PreviewImageComponent} from './components/preview-image/preview-image.component';
import {TagComponent} from './components/tag/tag.component';
import {UserComponent} from './components/user/user.component';
import {StatusComponent} from './components/status/status.component';
import {PopupTagComponent} from './components/select-popup/popup-tag/popup-tag.component';
import {AvatarSelectComponent} from './components/avatar-select/avatar-select.component';
import {UploadImageComponent} from './components/upload-image/upload-image.component';
import {PreviewFileComponent} from './components/preview-file/preview-file.component';
import {UploadFileComponent} from './components/upload-file/upload-file.component';
import {ContextMenuComponent} from './components/context-menu/context-menu.component';
import {ContextMenuItemComponent} from './components/context-menu/context-menu-item/context-menu-item.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {PasswordStrengthComponent} from './components/password-strength/password-strength.component';
import {SelectOnlyComponent} from './components/select/only/select-only/select.component';
import {SelectOnlyHeaderComponent} from './components/select/only/select-only-header/select-only-header.component';
import {SelectOnlyItemsComponent} from './components/select/only/select-only-items/select-only-items.component';
import {TaskPlusComponent} from './components/task-plus/task-plus.component';
import {AutoResizeDirective} from './directives/auto-resize.directive';
import {TimeAgoPipe} from './pipes/time-ago.pipe';
import {ImagePreviewPipe} from './pipes/image-preview.pipe';
import {AutoFocusModule} from './directives/auto-focus/auto-focus.module';
import {FilterModule} from './pipes/filter/filter.module';
import {ImageComponent} from './components/image/image.component';
import {UserMenuComponent} from './components/user-menu/user-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutoFocusModule,
    FilterModule,
    ClickOutsideModule
  ],
  exports: [
    SelectComponent,
    PopupUserComponent,
    PopupStatusComponent,
    SelectHeaderUserComponent,
    AvatarComponent,
    AvatarSelectComponent,
    TagComponent,
    UserComponent,
    StatusComponent,
    PopupTagComponent,
    PreviewImageComponent,
    UploadImageComponent,
    PreviewFileComponent,
    UploadFileComponent,
    ContextMenuComponent,
    ContextMenuItemComponent,
    CalendarComponent,
    PasswordStrengthComponent,
    SelectOnlyComponent,
    SelectOnlyHeaderComponent,
    SelectOnlyItemsComponent,
    TaskPlusComponent,
    AutoResizeDirective,
    ImagePreviewPipe,
    TimeAgoPipe,
    ImageComponent,
    UserMenuComponent
  ],
  declarations: [
    SelectComponent,
    PopupUserComponent,
    PopupStatusComponent,
    SelectHeaderUserComponent,
    AvatarComponent,
    AvatarSelectComponent,
    TagComponent,
    UserComponent,
    StatusComponent,
    PopupTagComponent,
    PreviewImageComponent,
    UploadImageComponent,
    PreviewFileComponent,
    UploadFileComponent,
    ContextMenuComponent,
    ContextMenuItemComponent,
    AvatarSelectComponent,
    CalendarComponent,
    PasswordStrengthComponent,
    SelectOnlyComponent,
    SelectOnlyHeaderComponent,
    SelectOnlyItemsComponent,
    TaskPlusComponent,
    AutoResizeDirective,
    ImagePreviewPipe,
    TimeAgoPipe,
    ImageComponent,
    UserMenuComponent,
  ]
})
export class UxModule {
}
