import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from "@angular/common/http";
import {
  ApplicationConfig,
  enableProdMode,
  importProvidersFrom,
} from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
  withHttpTransferCacheOptions,
} from "@angular/platform-browser";
import {
  BrowserAnimationsModule,
  provideAnimations,
} from "@angular/platform-browser/animations";
import { PreloadAllModules, RouterModule } from "@angular/router";
import { provideStore, StoreModule } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { provideStoreDevtools } from "@ngrx/store-devtools";
// import { SocketIoConfig } from "ngx-socket-io";
import { environment } from "../environments/environment";
import { reducers } from "@core/redux/index";
import { TokenInterceptor } from "./auth/interceptors/token.interceptor";
import { ProjectInterceptor } from "@core/interceptors/project.interceptor";
import { AuthEffects } from "@core/redux/auth/auth.effects";
import { ProjectEffects } from "@core/redux/project/project.effects";
import { TaskEffects } from "@core/redux/task/task.effects";
import { MessageEffects } from "@core/redux/message/message.effects";
import { StatusEffects } from "@core/redux/status/status.effects";
import { InviteEffects } from "@core/redux/invite/invite.effects";
import { TagEffects } from "@core/redux/tag/tag.effects";
import { FilterEffects } from "@core/redux/filter/filter.effects";
import { FileService } from "@core/services/file.service";
import { ApiService } from "@core/services/api.service";
import { TaskService } from "@core/services/task.service";
import { MessageService } from "@core/services/message.service";
import { StatusService } from "@core/services/status.service";
import { InviteService } from "@core/services/invite.service";
import { AuthGuardService } from "@core/services/auth-guard.service";
import { ProjectService } from "@core/services/project.service";
import { StoreTaskService } from "@core/services/store-task.service";
import { AuthService } from "@core/services/auth.service";
import { ImagePreviewPipe } from "@ux/pipes/image-preview.pipe";
import { TimeAgoPipe } from "@ux/pipes/time-ago.pipe";
import { registerLocaleData } from "@angular/common";
import localeRu from "@angular/common/locales/ru";
import { MAIN_ROUTES } from "./app.routes";
import { DeviceDetectorService } from "ngx-device-detector";

registerLocaleData(localeRu);

// const socketConfig: SocketIoConfig = {
//   url: "http://localhost:3001",
//   options: {},
// };

if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      BrowserModule,
      BrowserAnimationsModule,
      StoreModule.forRoot(reducers),
      RouterModule.forRoot(MAIN_ROUTES, {
        preloadingStrategy: PreloadAllModules,
      }),
    ]),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideAnimations(),
    provideAnimations(),
    provideStore(reducers),
    provideEffects([
      ProjectEffects,
      AuthEffects,
      StatusEffects,
      TaskEffects,
      MessageEffects,
      InviteEffects,
      TagEffects,
      FilterEffects,
    ]),
    // SocketIoModule.forRoot(socketConfig), <== Марк там по сокетам я до конца не разобрался но либа поменялась
    !environment.production ? provideStoreDevtools() : [],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProjectInterceptor,
      multi: true,
    },
    FileService,
    ApiService,
    TaskService,
    MessageService,
    StatusService,
    InviteService,
    AuthGuardService,
    ProjectService,
    StoreTaskService,
    AuthService,
    ImagePreviewPipe,
    TimeAgoPipe,
    DeviceDetectorService,
    provideClientHydration(
      withHttpTransferCacheOptions({ includePostRequests: true })
    ),
  ],
};
