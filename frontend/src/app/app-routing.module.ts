import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:'',redirectTo:'admin/login',pathMatch:'full'},
  {path:'admin',loadChildren:()=>import('./modules/auth/auth.module')
.then(mod=>mod.AuthModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }