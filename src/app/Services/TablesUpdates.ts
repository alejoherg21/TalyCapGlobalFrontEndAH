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

export class TablesUpdatesService {
  url = environment.url;
  baseUrl = "";
  authSubjet = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

 UpdateTable(table: string) : Observable<AuthResponse>{
  switch(table) {
    case "Authors":
      this.baseUrl = this.url + environment.urlUpdateAuthors;
      break;
    case "Books":
      this.baseUrl = this.url + environment.urlUpdateBooks;
      break;
    case "Users":
      this.baseUrl = this.url + environment.urlUpdateUsers;
      break;
}

const url = this.baseUrl;
    return this.httpClient.get<AuthResponse>(url).pipe(tap(
        (response: AuthResponse) => {
          return response;
        })
      );
  }
}
