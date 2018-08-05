import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { User, STATUS } from './users.model';

import { ToastrService } from 'ngx-toastr';
import { MessagingService } from '../service/messaging.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  userSubscription;
  users = new Array<User>();

  constructor(private userService: UserService,
              private messagingService: MessagingService,
              private toastr: ToastrService) {
  }

  ngOnInit() {

    this.userSubscription = this.messagingService.of(User)
    .subscribe(user => {
      this.users.push(user);
    });

    this.userService
      .users()
      .subscribe(users => {
        users = users;
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  submit(user) {
    this.toastr.info(`user.size ${this.users.length}!`);
    this.userService
      .create(user)
      .subscribe(result => {
        if (result.status === STATUS.ERROR) {
          this.toastr.success(`successfully created user ${user}!`);
        } else {
          this.toastr.warning(`Failed creating user ${user}`);
        }
    });
  }

}
