import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import * as fromRoot from "@core/redux/index";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private accessToken: string;

  constructor(private store: Store<fromRoot.State>, private router: Router) {
    this.store.select(fromRoot.getToken).subscribe((token) => {
      this.accessToken = token;
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setParams: {
        "access-token": this.accessToken,
      },
    });
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status === 302) {
              console.error("[HttpRequest] Редирект");
            }
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.error("[HttpRequest] Не авторизован");
              // this.store.dispatch(new AuthActions.SignOutAction());
              this.router.navigate(["/auth/sign-in"]);
            } else if (err.status === 403) {
              console.error("[HttpRequest] Доступ запрещен");
              // this.store.dispatch(new AuthActions.SignOutAction());
              this.router.navigate(["/dashboard"]);
            }
          }
        }
      )
    );
  }
}
