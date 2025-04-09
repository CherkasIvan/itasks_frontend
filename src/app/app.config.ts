import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
  withFetch,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import {
  enableProdMode,
  ApplicationConfig,
  importProvidersFrom,
} from "@angular/core";
import {
  BrowserModule,
  provideClientHydration,
  withHttpTransferCacheOptions,
} from "@angular/platform-browser";
import {
  provideRouter,
  withViewTransitions,
  RouterModule,
  PreloadAllModules,
} from "@angular/router";
import { AuthEffects } from "@core/redux/auth/auth.effects";
import { EffectsModule } from "@ngrx/effects";
import { provideStore, StoreModule } from "@ngrx/store";
import { environment } from "environments/environment";
import { MAIN_ROUTES } from "./app.routes";
import { TokenInterceptor } from "./auth/interceptors/token.interceptor";
import { ProjectInterceptor } from "@core/interceptors/project.interceptor";
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";

if (environment.production) {
  enableProdMode();
}

const socketConfig: SocketIoConfig = {
  url: "http://localhost:3001",
  options: {},
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideRouter(MAIN_ROUTES, withViewTransitions()),
    provideStore(),
    importProvidersFrom([
      BrowserModule,
      SocketIoModule.forRoot(socketConfig),
      RouterModule.forRoot(MAIN_ROUTES, {
        preloadingStrategy: PreloadAllModules,
      }),
      StoreModule.forRoot({}),
      EffectsModule.forRoot([AuthEffects]),
    ]),
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
    provideClientHydration(
      withHttpTransferCacheOptions({ includePostRequests: true })
    ),
  ],
};
