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
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { GererchiensComponent } from './admin/gererchiens/gererchiens.component';
import { GererchatsComponent } from './admin/gererchats/gererchats.component';
import { AjouterChiensComponent } from './admin/ajouter-chiens/ajouter-chiens.component';
import { AjouterchatComponent } from './admin/ajouterchat/ajouterchat.component';
import { GererRendezVousComponent } from './admin/gerer-rendez-vous/gerer-rendez-vous.component';
import { ModifierChienComponent } from './admin/modifier-chien/modifier-chien.component';
import { ModifierChatComponent } from './admin/modifier-chat/modifier-chat.component';
import { ModifierrendezvousComponent } from './admin/modifierrendezvous/modifierrendezvous.component';
import { AdoptionUpdatesComponent } from './user/adoption-updates/adoption-updates.component';
import { ChangerMotDesPasseComponent } from './auth/changer-mot-des-passe/changer-mot-des-passe.component';
import { PublicationslistComponent } from './admin/publicationslist/publicationslist.component';
import { AboutComponent } from './user/about/about.component';
import { AnimauxComponent } from './user/animaux/animaux.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {path: 'reset-password', component: ChangerMotDesPasseComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { path: 'home', title: 'home', component: HomeComponent },
  { path: 'list/:type', title: 'listAnimaux', component: ListAnimauxComponent },
  { path: 'home/:idUser', title: 'home', component: HomeComponent },
  { path: 'detail/:id', title: 'detail', component: DetailsComponent },
  { path: 'home/:idUser/list/:type', title: 'listAnimaux', component: ListAnimauxComponent },
  { path: 'home/:idUser/detail/:id', title: 'detail', component: DetailsComponent },
  {path: 'home/:idUser/Animaux', title: 'Animaux', component: AnimauxComponent},
   {path: 'Animaux', title: 'Animaux', component: AnimauxComponent},
  { path: 'home/:idUser/suiviDemande', title: 'MesDemandes', component: MesDemandesComponentComponent },
  { path: 'home/:idUser/formulaires', title: 'formulaires', component: FormulaireComponent },
  {path:'about',title:'about',component:AboutComponent},
  {path:'home/:idUser/publications',title:'publications',component:AdoptionUpdatesComponent},
    {path:'admin', title:'admin', component:DashboardComponent , children:[
      {path:'chiens',title:'chiens',component:GererchiensComponent},
      {path:'chats',title:'chats',component:GererchatsComponent},
      {path:'ajouterChien',title:'ajouterChien',component:AjouterChiensComponent},
      {path:'ajouterChat',title:'ajouterChat',component:AjouterchatComponent},
      {path:'Rendezvous',title:'Rendezvous',component:GererRendezVousComponent},
      {path:'modifierChien/:id',title:'modifierChien',component:ModifierChienComponent},
      {path:'modifierChat/:id',title:'modifierChat',component:ModifierChatComponent},
      {path:'ModifierRendezvous/:id',title:'Rendezvous',component:ModifierrendezvousComponent},

        { path: '', redirectTo: 'chiens', pathMatch: 'full' },
      {path:'publications',title:'publications',component:PublicationslistComponent},
    ]

    },

  { path: '', redirectTo: 'home', pathMatch: 'full' }, // ID par défaut
  { path: '**', redirectTo: 'home' } // Fallback route
];

