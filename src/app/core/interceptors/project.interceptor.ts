import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../redux';
import {first, flatMap} from 'rxjs/operators';

@Injectable()
export class ProjectInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromRoot.State>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.pipe(
      select(fromRoot.getProjectSelectedId),
      first(),
      flatMap((projectId) => {
        const projectReq = !!projectId ? request.clone({
          setParams: {projectId: projectId}
        }) : request;
        return next.handle(projectReq);
      }),
    );
  }
}
