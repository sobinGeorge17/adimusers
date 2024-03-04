import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  private endPoint = 'admin/users';
  private token = localStorage.getItem('token');
  userForm!: FormGroup;
  hide1 = true;
  hide2 = true;
  errorMessage!: string;
  successMsg = false;
  isUpdate = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any, isEdit: boolean }
  ) { }

  ngOnInit(): void {
    this.isUpdate = this.data?.isEdit;
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      firstName: [this.data?.user?.firstName, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      lastName: [this.data?.user?.lastName, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: [this.data?.user?.email, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      role: [this.data?.user?.role, [this.roleValidator]],
      password1: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]{3,30}$')]],
      password: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password1() {
    return this.userForm.get('password1');
  }

  get password() {
    return this.userForm.get('password');
  }

  get role() {
    return this.userForm.get('role');
  }

  roleValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) {
      return { 'invalidRole': true };
    }
    return null;
  }

  passwordMatchValidator(form: FormGroup) {
    const password1 = form.get('password1');
    const password2 = form.get('password');
    if (password1 && password2 && password1.value !== password2.value && password2.value !== '') {
      password2?.setErrors({ passwordMismatch: true });
    } else {
      password2?.setErrors(null);
    }
  }
 
  // edit the user
  updateForm() {
    if (this.userForm.valid && this.isUpdate) {
      const userId = this.data?.user?.id;
      const { password1, ...formData } = this.userForm.value;
      this.apiService.put(`${this.endPoint}/${userId}`, this.token, formData).subscribe(
        (response: any) => {
          console.log(response);
          if (response?.status === "true") {
            this.commonService.userSubject.next(true)
            this.openSuccessSnackBar('updated successfully');
            this.dialogRef.close();
          }
        }, (error: HttpErrorResponse) => {
          if (
            error?.status === 400 ||
            error?.status === 401 ||
            error?.status === 403 ||
            error?.status === 404 ||
            error?.status === 405 ||
            error?.status === 409 ||
            error?.status === 422 ||
            error?.status === 500
          ) {
            this.errorMessage = error.error.data.error.message;
          } else {
            this.errorMessage = 'An error occurred, please try again later';
          }
        }
      );
    }
  }
  
  // create the user
  submitForm() {
    if (this.userForm.valid && !this.isUpdate) {
      const { password1, ...formData } = this.userForm.value;
      this.apiService.post(formData, this.endPoint, this.token).subscribe(
        (res: any) => {
          if (res?.status === 'true') {
            this.commonService.userSubject.next(true)
            this.successMsg = true;
            this.openSuccessSnackBar('User created successfully');
            this.dialogRef.close();
          }
        },
        (error: HttpErrorResponse) => {
          if (
            error?.status === 401 ||
            error?.status === 403 ||
            error?.status === 422 ||
            error?.status === 400 ||
            error?.status === 409 ||
            error?.status === 500
          ) {
            this.errorMessage = error.error.data.error.message;
          } else {
            this.errorMessage = 'An error occurred, please try again later';
          }
        }
      );
    } else {
      this.userForm.markAllAsTouched();
    }
  }
  
  // to display success message
  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

}
