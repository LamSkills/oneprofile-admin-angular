import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';


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
      imports: [
        FormsModule,
        DataViewModule,
        DropdownModule,
        PanelModule,
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

    messagingService = TestBed.get(MessagingService);
    userService = TestBed.get(UserService);
    toastrService = TestBed.get(ToastrService);
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

});
