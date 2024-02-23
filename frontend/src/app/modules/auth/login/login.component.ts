import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;

  errorMessage: string = ''

  constructor(private fb: FormBuilder, private authservice: ApiService , private router:Router) { }

  loginform = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]{3,30}$')]]
    }
  )

  login() {
    if (this.loginform.valid) {
      this.authservice.post(this.loginform.value).subscribe((response: any) => {
        if (response.status == "true") {
          console.log("login sucess");
          if(response.data.user.accessToken){
            localStorage.setItem('token',response.data.user?.accessToken)
          }
          if(response.data.user?.role){
            localStorage.setItem('role',response.data.user?.role)
          }
          if(response.data.user?.role === 'admin'){
            this.router.navigate(['/home/admin/home'])
          }
        }
      }, (error: HttpErrorResponse) => {
        if(error?.status === 401 || error?.status === 404 || error?.status === 422){
          this.errorMessage = error.error.data.error.message
        }else{
          this.errorMessage = "an error occured , please try again later"
        }
      });
    }
  }



}
