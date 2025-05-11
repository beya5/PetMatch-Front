import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup ;
  readonly fb: FormBuilder = inject(FormBuilder)
  UserId!:number;
  userRole!:string;
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
 service:UserService=inject(UserService)
    router: Router=inject(Router);

    ngOnInit(): void {
      this.loginForm=this.fb.nonNullable.group(
        {
          email:['', Validators.required],
          password:['', [Validators.required]]
        }
        )
      }

      onSubmit() {
        if (!this.loginForm.valid) {
          console.log('Formulaire invalide !');
          return;
        }

        const { email, password } = this.loginForm.value;

        this.service.connecter(email, password).subscribe({
          next: (data) => {
            if (!data?.length) {
              console.log('Identifiants invalides !');
              return;
            }

            console.log('Connexion réussie !', data);
            this.UserId = data[0].id;
            this.userRole = data[0].role;
            this.service.setCurrentUserId( data[0].id);
            this.redirectAfterLogin();
          },
          error: (err) => console.error('Erreur lors de la connexion :', err)
        });
      }

      private redirectAfterLogin() {
        const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
        const animalId = this.activatedRoute.snapshot.queryParams['animalId'];
        if (this.userRole === 'admin') {
          this.router.navigate(['/admin']);
          return;
        }
        if (!returnUrl) {
          this.router.navigate(['/home', this.UserId]);
          return;
        }

        if (returnUrl.includes('formulaires')) {
          const navExtras = animalId ? { queryParams: { animalId } } : {};
          this.router.navigate(['/home', this.UserId, 'formulaires'], navExtras);
          return;
        }

        this.router.navigateByUrl(returnUrl).catch(() => {
          this.router.navigate(['/home', this.UserId]); // Fallback
        });
      }
}
