import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { NologinGuard } from './guards/nologin.guard';
import { ShowTaskComponent } from './components/show-task/show-task.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [NologinGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NologinGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NologinGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginGuardGuard],
  },
  {
    path: 'showTask',
    component: ShowTaskComponent,
    canActivate: [LoginGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
