import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';

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
    DataViewModule,
    DropdownModule,
    PanelModule,
    DialogModule
  ],
  declarations: [
    UsersComponent
  ],
  providers: [UserService, MessagingService, ToastrService],
})
export class UsersModule { }
