import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


import { UsersComponent } from './users.component';
import { UserService } from '../service/user.service';
import { MessagingService } from '../service/messaging.service';

const routes: Routes =  [
  { path: 'uers',    component: UsersComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UsersComponent
  ],
  providers: [UserService, MessagingService],
})
export class UsersModule { }
