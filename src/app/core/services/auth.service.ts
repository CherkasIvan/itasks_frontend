import {Injectable} from '@angular/core';
import {IdentityModel} from '../models/identity.model';
import {ApiService} from '@core/services/api.service';
import {SignUpSecurityModel} from '../models/sign-up-security.model';
import {SignUpInterviewModel} from '../models/sign-up-interview.model';
import 'rxjs/add/operator/map';
import {SignInModel} from '../models/sign-in.model';
import {SignUpModel} from '../models/sign-up.model';
import {SignUpPersonalDataModel} from '../models/sign-up-personal-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  signUp(model: SignUpModel) {
    return this
      .http
      .post<IdentityModel>(this.getApiUrl('authentications/sign-up'), model)
      .map((response) => (new IdentityModel()).setAttributes(response));
  }

  getUser() {
    return this
      .http
      .get<IdentityModel>(this.getApiUrl('authentications/get-user'))
      .map((response) => (new IdentityModel()).setAttributes(response));
  }


  signIn(model: SignInModel) {
    return this
      .http
      .post<IdentityModel>(this.getApiUrl('authentications/sign-in'), model)
      .map((response) => (new IdentityModel()).setAttributes(response));
  }

  signUpGoogle(model: { code }) {
    return this
      .http
      .get<IdentityModel>(this.getApiUrl(`authentications/google?code=${model.code}`))
      .map((response) => (new IdentityModel()).setAttributes(response));
  }

  signUpStepPersonalData(model: SignUpPersonalDataModel) {
    return this
      .http
      .put<IdentityModel>(this.getApiUrl('authentications/sign-up-step-personal-data'), model)
      .map((response) => (new IdentityModel()).setAttributes(response));
  }

  signUpStepSecurity(model: SignUpSecurityModel) {
    return this
      .http
      .put<IdentityModel>(this.getApiUrl('authentications/sign-up-step-security'), model)
      .map((response) => (new IdentityModel()).setAttributes(response));
  }

  signUpStepInterview(model: SignUpInterviewModel) {
    return this
      .http
      .put<IdentityModel>(this.getApiUrl('authentications/sign-up-step-questions'), model)
      .map((response) => (new IdentityModel()).setAttributes(response));
  }
}
