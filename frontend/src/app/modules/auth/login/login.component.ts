import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/common/common.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;
  errorMessage: string = ''
  private endPoint = 'auth/login'
  isLoading = false
  encryptedToken: string = ''
  localstorageVAlue!: string

  constructor(private fb: FormBuilder, private authservice: ApiService, private router: Router, private commonService: CommonService) { }
  loginform = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]{3,30}$')]]
    }
  )

  login() {
    if (this.loginform.valid) {
      this.isLoading = true
      this.authservice.post(this.loginform.value, this.endPoint).subscribe((response: any) => {
        if (response.status == "true") {
          console.log("login sucess");
          if (response?.data.user?.accessToken) {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('token', response.data.user?.accessToken)
            }
          }
          if (response?.data?.user?.role) {
            if (typeof localStorage !== 'undefined') {
              this.localstorageVAlue = response?.data?.user?.role
              const encryptedRole = this.commonService.encryptData(this.localstorageVAlue)
              if (typeof localStorage !== 'undefined') {
                localStorage.setItem('role', encryptedRole);
              }
            }

          }
          switch (response?.data?.user?.role) {
            case 'admin':
              this.router.navigate(['/dashboard']);
              break;
            case 'supervisor':
              this.router.navigate(['/dashboard']);
              break;
            default:
              this.router.navigate(['/dashboard/users']);
              break;
          }
        }
      }, (error: HttpErrorResponse) => {
        if (error?.status === 401 || error?.status === 404 || error?.status === 422) {
          this.errorMessage = error.error.data.error.message
        } else {
          this.errorMessage = "an error occured , please try again later"
        }
      }).add(() => {
        this.isLoading = false; // Hide spinner after API call completes
      });
    }
  }



}
