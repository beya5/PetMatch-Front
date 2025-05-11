import { Component, inject } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { NavComponent } from "./user/nav/nav.component";
import { FooterComponent } from "./user/footer/footer.component";
import { TokenInterceptor } from './interceptors/token.interceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'petMatch';
   showLayout = true;
 router:Router = inject(Router);

  isAdminRoute(): boolean {
    return this.router.url.includes('admin');
  }
}
