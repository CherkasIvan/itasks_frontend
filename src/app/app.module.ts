/**
 * Core
 */
import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
/**
 * Modules
 */
import {AppRoutingModule} from './app-routing.module';
/**
 * Components
 */
import {AppComponent} from './app.component';
/**
 * Reducers
 */
import {metaReducers, reducers} from '@core/redux/index';
/**
 * Interceptors
 */
import {TokenInterceptor} from './auth/interceptors/token.interceptor';
import {ProjectInterceptor} from '@core/interceptors/project.interceptor';
/**
 * Effects
 */
import {AuthEffects} from '@core/redux/auth/auth.effects';
import {ProjectEffects} from '@core/redux/project/project.effects';
import {TaskEffects} from '@core/redux/task/task.effects';
import {MessageEffects} from '@core/redux/message/message.effects';
import {StatusEffects} from '@core/redux/status/status.effects';
/**
 * Environment
 */
import {environment} from '../environments/environment';
import {InviteEffects} from '@core/redux/invite/invite.effects';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {FileService} from '@core/services/file.service';
import {StoreMessageService} from '@core/services/store-message.service';
import {ApiService} from '@core/services/api.service';
import {TaskService} from '@core/services/task.service';
import {MessageService} from '@core/services/message.service';
import {StatusService} from '@core/services/status.service';
import {InviteService} from '@core/services/invite.service';
import {AuthGuardService} from '@core/services/auth-guard.service';
import {ProjectService} from '@core/services/project.service';
import {StoreTaskService} from '@core/services/store-task.service';
import {AuthService} from '@core/services/auth.service';
import {ImagePreviewPipe} from '@ux/pipes/image-preview.pipe';
import {TimeAgoPipe} from '@ux/pipes/time-ago.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {ElectronService} from '@core/services/electron.service';
import {TagService} from '@core/services/tag.service';
import {TagEffects} from '@core/redux/tag/tag.effects';
import {FilterEffects} from '@core/redux/filter/filter.effects';
import {TaskQueryService} from '@core/services/query/task.query.service';
import {FilterApiService} from '@core/services/api/filter.api.service';
import {FilterStoreService} from '@core/services/store/filter.store.service';
import {ImageService} from '@core/services/image/image.service';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';

registerLocaleData(localeRu);
const config: SocketIoConfig = environment.socket;

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([
      ProjectEffects,
      AuthEffects,
      StatusEffects,
      TaskEffects,
      MessageEffects,
      InviteEffects,
      TagEffects,
      FilterEffects
    ]),
    DeviceDetectorModule.forRoot(),
    SocketIoModule.forRoot(config),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru-RU'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProjectInterceptor,
      multi: true
    },
    ApiService,
    AuthGuardService,
    FileService,
    ProjectService,
    StatusService,
    TaskService,
    MessageService,
    InviteService,
    StoreMessageService,
    ImagePreviewPipe,
    TimeAgoPipe,
    StoreTaskService,
    AuthGuardService,
    AuthService,
    // ElectronService,
    TagService,
    FilterApiService,
    FilterStoreService,
    TaskQueryService,
    ImageService
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
