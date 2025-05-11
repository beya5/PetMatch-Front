import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnimalServiceService } from '../../animal-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouterchat',
  imports: [ReactiveFormsModule],
  templateUrl: './ajouterchat.component.html',
  styleUrl: './ajouterchat.component.css'
})
export class AjouterchatComponent {
 private animalService = inject(AnimalServiceService);
  private fb :FormBuilder= inject(FormBuilder);
  private router:Router = inject(Router);

  catForm!: FormGroup;
  message = '';
  isLoading = false;
  constructor() {
    this.  catForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      race: ['', Validators.required],
      age: ['',  Validators.required ],
      sexe: ['', Validators.required],
      taille: ['', [Validators.required, Validators.pattern(/^\d+\s(cm)$/)]],
      poids: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?\s(kg)$/)]],
      statut: ['Disponible', Validators.required],
      date: ['', Validators.required],
      vaccin: [''],
      sterilise: [false],
      dents: ['Dents saines'],
      description: ['', [Validators.required, Validators.minLength(20)]],
      photoUrl: ['', Validators.required],
      type: ['Chat']
    });
  }

  onSubmit(): void {
    if (this.catForm.invalid) {
      this.animalService.ajouterAnimal(this.catForm.value).subscribe({
        next: () => {
          this.router.navigate(['admin/chats']);
        }
      });
    }


  }
}
