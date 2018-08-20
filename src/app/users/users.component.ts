import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User, Item, STATUS } from './users.model';

import { MessagingService } from '../service/messaging.service';
import { UserService } from '../service/user.service';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {


  displayDialog: boolean;
  user: User;
  selectedUser: User;
  users: User[];
  newUser: boolean;
  cols: any[];

  constructor(private userService: UserService,
              private messagingService: MessagingService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getUsers();

    this.cols = [
      { field: 'username', header: 'username' },
      { field: 'lastname', header: 'lastname' },
      { field: 'firstname', header: 'firstname' }
    ];
  }

  ngOnDestroy(): void {
    // this.userSubscription.unsubscribe();
  }

  getUsers() {
    this.userService
    .users()
    .subscribe(users => {
      this.users = users;
    });
  }

  createUser(user) {
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

  deleteUser(user) {
    this.userService
      .delete(user)
      .subscribe(result => {
        if (result.status === STATUS.ERROR) {
          this.toastr.success(`successfully created user ${user}!`);
        } else {
          this.toastr.warning(`Failed creating user ${user}`);
        }
    });
  }

  showDialogToAdd() {
    this.newUser = true;
    this.user = {};
    this.displayDialog = true;
  }

  save() {
      const users = [...this.users];
      if (this.newUser) {
        users.push(this.user);
        this.createUser(this.user);
      } else {
          users[this.users.indexOf(this.selectedUser)] = this.user;
      }
      this.users = users;
      this.user = null;
      this.displayDialog = false;
  }

  delete() {
      const index = this.users.indexOf(this.selectedUser);
      this.users = this.users.filter((val, i) => i !== index);
      this.deleteUser(this.selectedUser);
      this.user = null;
      this.displayDialog = false;
  }

  onRowSelect(event) {
      this.newUser = false;
      this.user = this.cloneUser(event.data);
      this.displayDialog = true;
  }

  cloneUser(u: User): User {
      const user = {};
      for (const prop in u) {
        if (u.hasOwnProperty(prop)) {
          user[prop] = u[prop];
        }
      }
      return user;
  }
}
