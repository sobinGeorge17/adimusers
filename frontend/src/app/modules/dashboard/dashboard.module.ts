import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadsectionComponent } from '../../components/headsection/headsection.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserHomeComponent } from './user-home/user-home.component';






@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    TableComponent,
    NavbarComponent,
    HeadsectionComponent,
    CreateUserComponent,
    UserHomeComponent,
  
   
   
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
