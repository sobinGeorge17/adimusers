import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private fb:FormBuilder){}

  registrationForm = this.fb.group(
    {
      fname:['',[Validators.required]],
      lname:['',[Validators.required]],
      email:['',[Validators.required]],
      role:['',[Validators.required]],
      password1:['',[Validators.required]],
      password2:['',[Validators.required]]
    
    }

  )
  submitForm(){
    if(this.registrationForm.valid){
      console.log(this.registrationForm);
      

    }
  }

}
