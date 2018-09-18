import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


import { Observable, of, defer } from 'rxjs';

import { UsersComponent } from './users.component';

import { User, Status, STATUS } from './users.model';

import { ToastrService } from 'ngx-toastr';
import { MessagingService } from '../service/messaging.service';
import { UserService } from '../service/user.service';


export function fakeAsyncResponse<T>(data: T) {
  // return defer(() => Promise.resolve(data));
  return of(data);
}

class MockUserService {
  create(user: User): Observable<User> {
    return fakeAsyncResponse(user);
  }
  users(): Observable<Array<User>> {
    return fakeAsyncResponse(new Array(new User()));
  }
}


class MockToastrService {
  warning() {}
  info() {}
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let messagingService: MessagingService;
  let userService: MockUserService;
  let toastrService: MockToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TableModule,
        ButtonModule,
        DialogModule
       ],
      declarations: [
        UsersComponent
       ],
      providers: [
        MessagingService,
        UserService,
        ToastrService,
        { provide: UserService, useClass: MockUserService },
        { provide: ToastrService, useClass: MockToastrService }
      ]
    })
    .compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();

    messagingService = TestBed.get(MessagingService);
    userService = TestBed.get(UserService);
    toastrService = TestBed.get(ToastrService);
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should create user async', () => {
    const user = new User();
    component.users = [];
    user.firstname = 'kong';
    user.lastname = 'to';
    user.username = 'newlight77';
    component.user = user;
    component.newUser = true;

    User.prototype.validate = () => true;
    component.save();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.users.length).toBe(1);
    });

  });

  it('should create user async', async(async() => {
    const user = new User();
    component.users = [];
    user.firstname = 'kong';
    user.lastname = 'to';
    user.username = 'newlight77';
    component.user = user;
    component.newUser = true;

    User.prototype.validate = () => true;
    component.save();

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.users.length).toBe(1);
  }));

  it('should create user component async', async(async() => {
    const user = new User();
    component.users = [];
    user.firstname = 'kong';
    user.lastname = 'to';
    user.username = 'newlight77';
    component.user = user;
    component.newUser = true;

    // const username = fixture.debugElement.query(By.css('#username'));
    // username.nativeElement.value = 'username';
    // const firstname = fixture.debugElement.query(By.css('#firstname'));
    // username.nativeElement.value = 'firstname';
    // const lastname = fixture.debugElement.query(By.css('#lastname'));
    // username.nativeElement.value = 'lastname';

    User.prototype.validate = () => true;
    component.save();

    await fixture.whenStable();
    fixture.detectChanges();

    const userTable = fixture.debugElement.query(By.css('tbody[class=ui-table-tbody]'));
    // const userTable = fixture.nativeElement.querySelectorAll('ui-table-tbody');
    expect(userTable.children.length).toBe(1);
  }));

});
