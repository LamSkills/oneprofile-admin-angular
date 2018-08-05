import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// import { Observable, of } from 'rxjs';

import { UsersComponent } from './users.component';

import { User, Status, STATUS } from './users.model';

import { ToastrService } from 'ngx-toastr';
import { MessagingService } from '../service/messaging.service';
import { UserService } from '../service/user.service';


class MockUserService {
  observable = new Observable();
  create(user: User) {
    return this.observable;
  }
  users() {
    return this.observable;
  }
}

class Observable {
  subscribe(observer) {}
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
      imports: [ FormsModule ],
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

    messagingService = TestBed.get(MessagingService);
    userService = TestBed.get(UserService);
    toastrService = TestBed.get(ToastrService);
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call submit() on button click', async(() => {
    spyOn(component, 'submit');

    const button = fixture.debugElement.query(By.css('button[id=submit]'));
    button.nativeElement.click();

    fixture.whenStable().then(() => {
      expect(component.submit).toHaveBeenCalled();
    });
  }));

  it('should not call users when form is invalid on submit button click', async(() => {
    spyOn(userService, 'users');
    component.submit(new User());

    fixture.whenStable().then(() => {
      expect(userService.users).toHaveBeenCalledTimes(0);
    });
  }));

  it('should call create when submit() is called ', async(() => {
    spyOn(userService.observable, 'subscribe');

    User.prototype.validate = () => true;
    component.submit(new User());

    fixture.whenStable().then(() => {
      expect(userService.observable.subscribe).toHaveBeenCalled();
    });
  }));

});
