import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup ;
  readonly fb: FormBuilder = inject(FormBuilder)
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
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.service.connecter(email, password).subscribe({
        next: (data) => {
          if (data) {
            console.log('Connexion réussie !');
            this.router.navigate(['/home']);
          } else {
            console.log('Identifiants invalides !');
          }
        },
        error: (err) => {
          console.error('Erreur lors de la connexion :', err);
        }
      });
    }
  else {
      console.log('Formulaire invalide !');
    }
}
}
