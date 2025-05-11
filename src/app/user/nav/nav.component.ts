import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../user.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  isLoggedIn = true;
  showMenu = false;
  utilisateur!:any;

  idUser: any;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.idUser = this.userService.getCurrentUserId();
    console.log('ID utilisateur récupéré dans nav :', this.idUser);
    this.userService.getUserById(this.idUser).subscribe({
      next: (data) => {
        this.utilisateur = data;
        console.log('Utilisateur récupéré :', this.utilisateur);
      },
      error: (err) => console.error('Erreur de récupération de l\'utilisateur :', err)
    });
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  deconnecter(): void {
    this.isLoggedIn = false;
    this.showMenu = false;
    this.userService.setCurrentUserId(null);
    this.router.navigate(['/home']);
  }

  navigateToDemandes(): void {
    this.idUser = this.userService.getCurrentUserId(); // <-- S'assurer que c'est bien à jour
    if (!this.idUser) {
      console.error('idUser est manquant !');
      return;
    }
    this.router.navigate(['/home', this.idUser, 'suiviDemande']);
  }
  navigateToUpdates(): void {
    this.idUser = this.userService.getCurrentUserId(); // <-- S'assurer que c'est bien à jour
    if (!this.idUser) {
      console.error('idUser est manquant !');
      return;
    }
    this.router.navigate(['/home', this.idUser, 'publications']);
  }
  changer(){
    this.router.navigate(['auth/reset-password']);
  }
}
