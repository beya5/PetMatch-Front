import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
isLoggedIn = false;

  constructor(private router: Router) {
    // Écoute les changements d'URL
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const segments = this.router.url.split('/');
        const lastSegment = segments[segments.length - 1];
        this.isLoggedIn = !!lastSegment && lastSegment.length >= 3;
      });
  }

  deconnecter() {
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }
}
