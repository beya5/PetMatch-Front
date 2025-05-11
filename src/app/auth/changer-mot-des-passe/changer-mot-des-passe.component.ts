import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changer-mot-des-passe',
  imports: [ReactiveFormsModule],
  templateUrl: './changer-mot-des-passe.component.html',
  styleUrl: './changer-mot-des-passe.component.css'
})
export class ChangerMotDesPasseComponent implements OnInit {
  passwordForm: FormGroup;
      private userService: UserService=inject(UserService);

  userId: any = this.userService.getCurrentUserId();

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(6)]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.checkPasswords }
    );
  }

  ngOnInit(): void {}

  checkPasswords(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { notSame: true };
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const { oldPassword, newPassword } = this.passwordForm.value;

      const success = this.userService.changerMotDePasse(
        this.userId,
        oldPassword,
        newPassword
      );

      if (success) {
        alert('Mot de passe changé avec succès');
        this.router.navigate(['/home', this.userId]);
      } else {
        alert('Ancien mot de passe incorrect.');
      }
    }
  }
}
