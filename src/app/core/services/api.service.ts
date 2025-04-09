import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { throwError } from "rxjs";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(protected http: HttpClient) {}

  protected getApiUrl(action: string): string {
    return API_URL + action;
  }

  protected handleError(error: Response | any) {
    console.error("ApiService::handleError", error);
    return throwError(error);
  }
}
