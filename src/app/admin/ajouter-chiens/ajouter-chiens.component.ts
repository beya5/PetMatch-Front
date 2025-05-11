import { Component, inject } from '@angular/core';
import { AnimalServiceService } from '../../animal-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-chiens',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajouter-chiens.component.html',
  styleUrls: ['./ajouter-chiens.component.css']})
export class AjouterChiensComponent {
  private animalService = inject(AnimalServiceService);
  private fb :FormBuilder= inject(FormBuilder);
  private router:Router = inject(Router);

  dogForm: FormGroup;
  message = '';
  isLoading = false;
  constructor() {
    this.dogForm = this.fb.group({
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
      type: ['Chien']
    });
  }

  onSubmit(): void {
    if (this.dogForm.invalid) {
      this.animalService.ajouterAnimal(this.dogForm.value).subscribe({
        next: () => {
          this.router.navigate(['admin/chiens']);
        }
      });
    }


  }

}
