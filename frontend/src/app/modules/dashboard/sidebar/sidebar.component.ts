import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  activeTab = 'dashboard'

  role!:any
  constructor(public dialog:MatDialog) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role')
  }

  openDialog() {
    this.activeTab = 'createuser'
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.activeTab = 'dashboard'
    });
  }


}
