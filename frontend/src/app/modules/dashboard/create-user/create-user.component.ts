import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';
import { error } from 'console';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  private endPoint = 'admin/users'
  private token = localStorage.getItem('token')
  constructor(private fb :FormBuilder ,private registerService:ApiService){}
  hide1 = true
  hide2=true

  registrationForm = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [this.roleValidator]],
      password1: ['', [Validators.required]],
      password: ['', [Validators.required]]
    },
    {
      validators: this.passwordMatchValidator
    }
  )
  get role() {
    return this.registrationForm.get('role')
  }
  get firstName(){
    return this.registrationForm.get('firstName')
  }
  get lastName(){
    return this.registrationForm.get('lastName')
  }
  get email(){
    return this.registrationForm.get('email')
  }
  get password1(){
    return this.registrationForm.get('password1')
  }
  get password2() {
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
    if (password1 && password2 && password1.value !== password2.value && password2.value !=='') {
      password2?.setErrors({ passwordMismatch: true })
    } else {
      password2?.setErrors(null)
    }

  }


  submitForm() {
    if (this.registrationForm.valid) {
      // console.log(this.registrationForm.value);
      const {password1,...formData} = this.registrationForm.value
      console.log(formData);
      
      this.registerService.posts(formData,this.endPoint,this.token).subscribe((res)=>{
        console.log(res);
      },(error)=>{
        console.log(error,"eror");
        
      })
    } else {
      this.registrationForm.markAllAsTouched()
    }
  }



}
