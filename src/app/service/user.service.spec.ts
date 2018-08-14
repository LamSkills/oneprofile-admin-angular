import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './user.service';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../users/users.model';

class MockHttpClient {
  get(url: String, httpOptions): Array<User> {
    const resultat = new User();
    resultat.uid = 'testUserId';
    resultat.username = 'random';
    resultat.firstname = 'SENT';
    resultat.lastname = 'empty';
    const results = new Array<User>();
    results.push(resultat);
    return results;
  }
}

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
            UserService,
            HttpClient,
            { provide: HttpClient, useClass: MockHttpClient }
        ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('should do a post when calling users()', inject([HttpClient], (http: MockHttpClient) => {
    const url = 'admin/api/users';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const results = http.get(url, httpOptions);
    console.log(results.length);
    expect(results.pop().uid).toBe('testUserId');
  }));
});
