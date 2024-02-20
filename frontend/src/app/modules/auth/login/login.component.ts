import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private api: ApiService) { }

  loginform = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }
  )
  
  login() {
    if(this.loginform.valid){ 
      this.api.post(this.loginform.value).subscribe((response)=>{
        console.log(response);
      },(err)=>{
        console.log(err,"error"); 
      })
    }
  }

}
