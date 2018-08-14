import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User, Item, STATUS } from './users.model';

import { MessagingService } from '../service/messaging.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[];

  selectedUser: User;

  displayDialog: boolean;

  sortOptions: Item[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  userSubscription;

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
        this.users = users;
      });

    this.sortOptions = [
        {label: 'Newest First', value: '!year'},
        {label: 'Oldest First', value: 'year'},
        {label: 'Brand', value: 'brand'}
    ];
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  selectUser(event: Event, user: User) {
    this.selectedUser = user;
    this.displayDialog = true;
    event.preventDefault();
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
  }

  onDialogHide() {
    this.selectedUser = null;
  }

  create(user) {
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
