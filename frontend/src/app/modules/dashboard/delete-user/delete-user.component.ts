import { Component, Inject } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {

  token = localStorage.getItem('token');

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
  ) { }

  onDeleteClick(): void {
    this.apiService.delete(`admin/users/${this.data.userId}`, this.token).subscribe(
      (response: any) => {
        if (response?.status === 'true') {
          this.dialogRef.close(true); // Send true if delete is successful
        }
      },
      (error: HttpErrorResponse) => {
        if (error?.status === 401 || error?.status === 403 || error?.status === 405
          || error?.status === 404 || error?.status === 500) {
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
