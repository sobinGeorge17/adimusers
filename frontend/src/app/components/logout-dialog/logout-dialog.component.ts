import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.css'
})
export class LogoutDialogComponent {

  constructor(
    public dialogRef:MatDialogRef<LogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA)  public data:any
    ){}

  onNoClick(){
    this.dialogRef.close()
    
  }
  onLogoutClick(){
    this.dialogRef.close(true)

  }

}
