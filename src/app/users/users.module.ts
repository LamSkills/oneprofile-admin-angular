import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { ToastrService } from 'ngx-toastr';

import { UsersComponent } from './users.component';
import { UserService } from '../service/user.service';
import { MessagingService } from '../service/messaging.service';

const routes: Routes =  [
  { path: 'users',    component: UsersComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forChild(routes),
    DialogModule,
    TableModule,
    ButtonModule
  ],
  declarations: [
    UsersComponent
  ],
  providers: [UserService, MessagingService, ToastrService],
})
export class UsersModule { }
