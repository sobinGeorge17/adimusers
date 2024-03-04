import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.css'
})
export class LogoutDialogComponent {
  token = localStorage.getItem('token')
  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick() {
    this.dialogRef.close()
  }

  onActionClick() {
    if (this.data.action === 'logout') {
      this.onLogoutClick()

    } else if (this.data.action === 'delete') {
      this.onDeleteClick()
    }
  }
  onLogoutClick() {
    this.dialogRef.close(true)
  }
  onDeleteClick(): void { 
    this.apiService.delete(`admin/users/${this.data.userId}`, this.token).subscribe(
      (response: any) => {
        if (response?.status === 'true') {
          this.dialogRef.close(true); 
        }
      },
      (error: HttpErrorResponse) => {
        if (error) {
          this.openErrorSnackBar = error.error.data.error.message
        }
      }
    );
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // 5 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'] // Optional custom styling
    });
  }

}
