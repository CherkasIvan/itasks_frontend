import { Routes } from "@angular/router";
import { AuthGuardService } from "./core/services/auth-guard.service";

export const MAIN_ROUTES: Routes = [
  {
    path: "auth",
    loadComponent: () =>
      import("./auth/auth.component").then((m) => m.AuthComponent),
  },
  {
    path: "cabinet/:projectId",
    loadComponent: () =>
      import("./cabinet/cabinet.component").then((m) => m.CabinetComponent),
    canActivate: [AuthGuardService],
  },
  {
    path: "dashboard",
    loadComponent: () =>
      import("./dashboard/dashboard.component").then(
        (m) => m.DashboardComponent
      ),
    canActivate: [AuthGuardService],
  },
  { path: "**", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
];
