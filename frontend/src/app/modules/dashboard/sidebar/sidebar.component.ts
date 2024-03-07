import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { CommonService } from '../../../services/common/common.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  activeTab = 'dashboard'

  role!:any
  constructor(public dialog:MatDialog,private commomService:CommonService) {}

  ngOnInit(): void {
    this.decryptRole()
  }

  decryptRole() {
    const encryptedRole = localStorage.getItem('role');
    if (encryptedRole) {
      this.role = this.commomService.decryptData(encryptedRole);
    }
  }

  openDialog() {
    this.activeTab = 'createuser'
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.activeTab = 'dashboard'
    });
  }


}
