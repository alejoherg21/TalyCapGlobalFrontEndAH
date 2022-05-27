import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { AuthResponse } from '../Models/ApiAuthentication';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginI } from '../Models/login.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  url = environment.url;
  baseUrl = this.url + environment.urlLogin;
  //AUTH_SERVER: string = 'https://localhost:44376/api/Auth';
  authSubjet = new BehaviorSubject(false);
  constructor(private httpClient: HttpClient) { }

 login(login: loginI) : Observable<AuthResponse>{

  const url = this.baseUrl;
  var jsonObject ={
        "userName": login.UserName,
        "password": login.Password
    }

    return this.httpClient.post<AuthResponse>(url,
      jsonObject).pipe(tap(
        (response: AuthResponse) => {
          return response;
        })
      );
  }
}
