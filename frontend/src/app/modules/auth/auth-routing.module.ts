import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { loginGuard } from '../../services/authGuard/login.guard';

const routes: Routes = [
  {path:'',component:LoginComponent,canActivate:[loginGuard]},
  {path:'signup',component:RegistrationComponent,canActivate:[loginGuard]},
  {path:'forgot/password',component:ForgotPasswordComponent,canActivate:[loginGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
