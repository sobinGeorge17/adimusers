import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authguardGuard } from '../../services/authGuard/authguard.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[authguardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
