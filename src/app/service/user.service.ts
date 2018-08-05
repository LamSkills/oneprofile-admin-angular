import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User, Status } from '../users/users.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private url = 'api/users';

  constructor(private http: HttpClient) { }

  create(user: User): Observable<Status> {
    return this.http.post<Status>(this.url, user, httpOptions);
  }

  users(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.url, httpOptions);
  }
}
