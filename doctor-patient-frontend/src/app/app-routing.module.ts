import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRegisterComponent } from './Authenciation/auth-register/auth-register.component';
import { AuthComponent } from './Authenciation/auth/auth.component';

const routes: Routes = [
  { path: "", component:  AuthComponent },
  { path: "login", component:  AuthComponent },
  { path: "register", component:  AuthRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
