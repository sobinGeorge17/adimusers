import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HeadsectionComponent } from '../../components/headsection/headsection.component';





@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    TableComponent,
    NavbarComponent,
    HeadsectionComponent,
   
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class DashboardModule { }
