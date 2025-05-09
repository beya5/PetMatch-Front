import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { HomeComponent } from './user/home/home.component';
import { ListAnimauxComponent } from './user/list-animaux/list-animaux.component';
import { DetailsComponent } from './user/details/details.component';
import { FormulaireComponent } from './user/formulaire/formulaire.component';
import { MesDemandesComponentComponent } from './user/mes-demandes-component/mes-demandes-component.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { path: 'home', title: 'home', component: HomeComponent },
  { path: 'list/:type', title: 'listAnimaux', component: ListAnimauxComponent },
  { path: 'home/:idUser', title: 'home', component: HomeComponent },
  { path: 'detail/:id', title: 'detail', component: DetailsComponent },
  { path: 'home/:idUser/list/:type', title: 'listAnimaux', component: ListAnimauxComponent },
  { path: 'home/:idUser/detail/:id', title: 'detail', component: DetailsComponent },
  { path: 'home/:idUser/suiviDemande', title: 'MesDemandes', component: MesDemandesComponentComponent },
  { path: 'home/:idUser/formulaires', title: 'formulaires', component: FormulaireComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // ID par défaut
  { path: '**', redirectTo: 'home' } // Fallback route
];

