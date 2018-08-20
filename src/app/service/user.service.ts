import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User, Status } from '../users/users.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private url = 'api/unsecure/users';

  constructor(private http: HttpClient) { }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, httpOptions);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/' + user.username, user, httpOptions);
  }

  delete(user: User): Observable<void> {
    return this.http.delete<void>(this.url + '/' + user.username, httpOptions);
  }

  users(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.url, httpOptions);
  }
}
