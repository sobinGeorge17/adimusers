import { Component,EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-headsection',
  templateUrl: './headsection.component.html',
  styleUrl: './headsection.component.css'
})
export class HeadsectionComponent {
  @Output() sidenavToggle = new EventEmitter()
  @Input() roledata!:any
  isNavCollapsed = true;
  constructor (private router:Router, private dialog:MatDialog){}

  toggleSidenav(){
    this.sidenavToggle.emit();

  }
  openDialog(){
    let dialogRef = this.dialog.open(LogoutDialogComponent,
      {width:'auto',
    data:{message:"Are you sure you want to log out?",title:'Confirm Logout ?',action:'logout'}})

    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.logout()
      }
    })
  }
  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.router.navigate([''])
  }

}
