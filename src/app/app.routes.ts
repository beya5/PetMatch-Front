import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { HomeComponent } from './user/home/home.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
          { path: 'reset-password', component: ResetPasswordComponent }
        ]
      },
      { path: 'home',title:'home', component: HomeComponent },

    {path:"home",title:"home",component:HomeComponent},
    { path:'', redirectTo: 'home', pathMatch:'full'}

];
