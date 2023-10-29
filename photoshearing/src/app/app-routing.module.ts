import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { NormalGurdService } from './pages/normal-gurd.service';

const routes: Routes = [
  // {
  //   path:'',
  //   component:SignupComponent
  // },
  // {
  //   path:'login',
  //   component:LoginComponent
  // },
  {
    path:'admin',
    component:AdminLayoutComponent,
    canActivate:[NormalGurdService],
    children:[
      {
        path:'',
        loadChildren: ()=> import('src/app/layout/admin-layout/admin-layout.module').then(m=>m.AdminLayoutModule),
        
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
