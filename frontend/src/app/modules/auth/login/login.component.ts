import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage: string = ''

  constructor(private fb: FormBuilder, private authservice: ApiService) { }

  loginform = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]{3,30}$')]]
    }
  )

  login() {
    if (this.loginform.valid) {
      this.authservice.post(this.loginform.value).subscribe((response: any) => {
        console.log(response, 'response');
        if (response.status == "true") {
          console.log("login sucess");
        }
      }, (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.errorMessage = error.error.data.error.message
        } else if (error.status === 404) {
          this.errorMessage = error.error.data.error.message
        }
        else if (error.status === 422) {
          this.errorMessage = error.error.data.error.message
        }
        else {
          this.errorMessage = "an error occured , please try again later"
        }
      });
    }
  }



}
