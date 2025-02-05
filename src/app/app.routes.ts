import { Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {CustomerListComponent} from './customers/customer-list/customer-list.component';
import {AuthGuard} from './guards/auth.guard';
import {RegisterComponent} from './auth/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'customers', component: CustomerListComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
