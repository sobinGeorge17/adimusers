import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from '../../services/authGuard/authguard.guard';
import { UserHomeComponent } from './user-home/user-home.component';
import { SupervisorComponent } from './supervisor/supervisor.component';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[authGuard]},
  {path:'users',component:UserHomeComponent},
  {path:'supervisor',component:SupervisorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
