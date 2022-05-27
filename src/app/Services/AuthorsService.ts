import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorsResponse } from '../Models/AuthorsList';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookFilter } from '../Models/BookFilter';
import { BoolFilterResponse } from '../Models/BoolFilterResponse';

@Injectable({
  providedIn: 'root'
})

export class AuthorsService {
  url = environment.url;
  authSubjet = new BehaviorSubject(false);
  baseUrl = "";

  constructor(private httpClient: HttpClient) { }

 GetAuthors() : Observable<AuthorsResponse[]>{
  this.baseUrl = this.url + environment.urlGetAuthorsList;
  const url = this.baseUrl;
  return this.httpClient.get<AuthorsResponse[]>(url).pipe(tap(
      (response: AuthorsResponse[]) => {
        return response;
      })
    );
  }

  // GetBookFilter(bookFilter: BookFilter) : Observable<BoolFilterResponse>{
  //   this.baseUrl = this.url + environment.urlGetBookFilter;
  //   const url = this.baseUrl;
  //   return this.httpClient.post<BoolFilterResponse>(url,bookFilter).pipe(tap(
  //       (response: BoolFilterResponse) => {
  //         return response;
  //       })
  //     );
  //   }
    GetBookFilter(bookFilter: BookFilter) : Observable<BoolFilterResponse[]>{
      this.baseUrl = this.url + environment.urlGetBookFilter;
      const url = this.baseUrl;
      return this.httpClient.post<BoolFilterResponse[]>(url,bookFilter)
      }
    }
