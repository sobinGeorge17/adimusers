import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {

  constructor(private fb:FormBuilder){}

    loginform = this.fb.group(
      {
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]]
      }
    )
  

  

  login(){
    console.log('formsubmitted');
    if(this.loginform.valid){
      const email = this.loginform.value.email
      const pass = this.loginform.value.password
      console.log(email);
      console.log(pass);
      
      
    }

  }

}
