import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loginForm!: FormGroup;
activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly fb = inject(FormBuilder);
  service: UserService = inject(UserService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      conf_password: ['', Validators.required],
    });
  }

  onSubmit() {
    // 1. Validation rapide
    if (!this.loginForm.valid || this.loginForm.value.password !== this.loginForm.value.conf_password) {
      console.log('Formulaire invalide ou mots de passe différents !');
      return;
    }

    // 2. Création du compte
    this.service.creerCompte(this.loginForm.value).subscribe({
      next: (newUser) => {
        const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
        const targetUrl = returnUrl || `/home/${newUser.id}`;

        this.router.navigateByUrl(targetUrl).catch(() => {
          this.router.navigate(['/home', newUser.id]);
        });
      },
      error: (err) => {
        console.error('Erreur:', err);
        alert(err.error?.message || 'Erreur lors de la création du compte');
      }
    });
  }

}
