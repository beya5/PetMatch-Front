import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet ,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userService:UserService=inject(UserService);
  router:Router=inject(Router);
  deconnecter(): void {

    this.userService.setCurrentUserId(null);
    this.router.navigate(['/home']);
  }
}
