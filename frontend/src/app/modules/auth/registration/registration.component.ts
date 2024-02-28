import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';
import { error } from 'console';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(private fb: FormBuilder, private apiService: ApiService) { }
  hide1 = true
  hide2 = true
  endPoint = 'agents'

  registrationForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password1: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]{8,30}$')]],
    password: ['', [Validators.required]]
  }, {
    validators: this.passwordMatchValidator
  });
  
  // get role() {
  //   return this.registrationForm.get('role')
  // }
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
    if (password1 && password2 && password1.value !== password2.value && password2.value !== '') {
      password2?.setErrors({ passwordMismatch: true })
    } else {
      password2?.setErrors(null)
    }

  }


  submitForm() {
  
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      const { password1, ...formData } = this.registrationForm.value
      console.log(formData);

      this.apiService.post(formData, this.endPoint,).subscribe((res) => {
        console.log(res);
      }, (error) => {
        console.log(error);
      })
    } else {
      this.registrationForm.markAllAsTouched()
    }
  }

}
