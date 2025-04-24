import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import * as fromRoot from "@core/redux/index";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private store: Store<fromRoot.State>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const isAuth$ = this.store.select(fromRoot.getIsAuth);
    const authStep$ = this.store.select(fromRoot.getStep);
    const url: string = state.url;
    const step1 = "/auth/sign-up/step-1";
    const step2 = "/auth/sign-up/step-2";
    const step3 = "/auth/sign-up/step-3";
    const step4 = "/auth/sign-up/step-4";

    const combined = combineLatest(isAuth$, authStep$);

    return combined.pipe(
      map(([isAuth, authStep]) => {
        if (!isAuth) {
          this.router.navigate(["/auth/sign-in"]);
          return false;
        }

        if (authStep === "end") {
          return true;
        }

        if (authStep === "personalData" && url !== step1) {
          this.router.navigate([step1]);
          return false;
        }

        if (authStep === "security" && url !== step2) {
          this.router.navigate([step2]);
          return false;
        }

        if (authStep === "questions" && url !== step3) {
          this.router.navigate([step3]);
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
