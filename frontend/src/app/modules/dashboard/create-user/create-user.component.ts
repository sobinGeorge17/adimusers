import { Component, EventEmitter, Inject, OnInit, Output, } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent  {

  private endPoint = 'admin/users'
  private token = localStorage.getItem('token')
  userForm!:FormGroup
  hide1 = true
  hide2 = true
  errorMessage!: string
  successMsg = false


  constructor(private fb: FormBuilder, private apiService: ApiService,
    private snackBar: MatSnackBar, private dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any, isEdit: boolean }
  ) { }

  registrationForm = this.fb.group(
    {
      firstName: [this.data?.user?.firstName, [Validators.required]],
      lastName: [this.data?.user?.lastName, [Validators.required]],
      email: [this.data?.user?.email, [Validators.required, Validators.email]],
      role: [this.data?.user?.role, [this.roleValidator]],
      password1: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]{3,30}$')]],
      password: ['', [Validators.required]]
    },
    {
      validators: this.passwordMatchValidator
    }
  )
  get role() {
    return this.registrationForm.get('role')
  }
  get firstName() {
    return this.registrationForm.get('firstName')
  }
  get lastName() {
    return this.registrationForm.get('lastName')
  }
  get email() {
    return this.registrationForm.get('email')
  }
  get password1() {
    return this.registrationForm.get('password1')
  }
  get password() {
    return this.registrationForm.get('password')
  }
 

  roleValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) {
      return { 'invalidRole': true }
    }
    return null

  }

  passwordMatchValidator(form: FormGroup) {
    const password1 = form.get('password1')
    const password2 = form.get('password')
    if (password1 && password2 && password1.value !== password2.value && password2.value !== '') {
      password2?.setErrors({ passwordMismatch: true })
    } else {
      // password2?.setErrors(null)
    }

  }
  
  //update form
  updateForm(){
    const userId = this.data.user.id
    const {password1,password,...formData} = this.registrationForm.value
    this.apiService.put(`${this.endPoint}/${userId}`,this.token,formData)
  }

  submitForm() {
    if (this.registrationForm.valid) {
      // console.log(this.registrationForm.value);
      const { password1, ...formData } = this.registrationForm.value
      console.log(formData);

      this.apiService.post(formData, this.endPoint, this.token).subscribe((res: any) => {
        if (res?.status === 'true') {
          this.successMsg = true
          this.openSuccessSnackBar('User created successfully');
          this.dialogRef.close();
        }
      }, (error: HttpErrorResponse) => {
        if (error?.status === 401 || error?.status === 403 || error?.status === 422
          || error?.status === 400 || error?.status === 409 || error?.status === 500) {
          this.errorMessage = error.error.data.error.message
        } else {
          this.errorMessage = "an error occured , please try again later"
        }
      })
    } else {
      this.registrationForm.markAllAsTouched()
    }
  }

  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000, // 5 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  // openErrorSnackBar(message: string) {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 5000, // 5 seconds
  //     horizontalPosition: 'center',
  //     verticalPosition: 'top',
  //     panelClass: ['error-snackbar'] // Optional custom styling
  //   });
  // }


}
