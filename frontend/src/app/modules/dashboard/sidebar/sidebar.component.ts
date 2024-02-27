import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(public dialog:MatDialog){}

  openDialog() {
    const dialogRef = this.dialog.open(CreateUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
