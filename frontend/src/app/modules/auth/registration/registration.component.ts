import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private fb: FormBuilder) { }
  hide1 = true
  hide2=true

  registrationForm = this.fb.group(
    {
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [this.roleValidator]],
      password1: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]{3,30}$')]],
      password2: ['', [Validators.required]]
    },
    {
      validators: this.passwordMatchValidator
    }
  )
  get role() {
    return this.registrationForm.get('role')
  }
  get firstName(){
    return this.registrationForm.get('fname')
  }
  get lastName(){
    return this.registrationForm.get('lname')
  }
  get email(){
    return this.registrationForm.get('email')
  }
  get password1(){
    return this.registrationForm.get('password1')
  }
  get password2() {
    return this.registrationForm.get('password2')
  }
  

  roleValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) {
      return { 'invalidRole': true }
    }
    return null

  }

  passwordMatchValidator(form: FormGroup) {
    const password1 = form.get('password1')
    const password2 = form.get('password2')
    if (password1 && password2 && password1.value !== password2.value && password2.value !=='') {
      password2?.setErrors({ passwordMismatch: true })
    } else {
      password2?.setErrors(null)
    }

  }


  submitForm() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    } else {
      this.registrationForm.markAllAsTouched()
    }
  }

}
