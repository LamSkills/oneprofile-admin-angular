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

  create(user: User): Observable<Status> {
    return this.http.post<Status>(this.url, user, httpOptions);
  }

  delete(user: User): Observable<Status> {
    return this.http.delete<Status>(this.url + '/' + user.username, httpOptions);
  }

  update(user: User): Observable<Status> {
    return this.http.put<Status>(this.url + '/' + user.username, user, httpOptions);
  }

  users(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.url, httpOptions);
  }
}
