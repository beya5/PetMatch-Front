import { Component, inject, OnInit } from '@angular/core';
import { AnimalServiceService } from '../../animal-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FicheAnimal } from '../../fiche-animal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifier-chien',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modifier-chien.component.html',
  styleUrls: ['./modifier-chien.component.css']
})
export class ModifierChienComponent implements OnInit {
  private animalService = inject(AnimalServiceService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  dogForm!: FormGroup;
  currentDog!: FicheAnimal;
  message = '';
  isLoading = false;
  idAnimal!: any;

  ngOnInit(): void {
    this.idAnimal = this.route.snapshot.params['id'];
    this.loadAnimalData();
  }

  loadAnimalData(): void {
    this.isLoading = true;
    this.animalService.getAnimalParId(this.idAnimal).subscribe({
      next: (animal) => {
        this.currentDog = animal;
        this.initForm();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement', err);
        this.message = 'Erreur lors du chargement des données';
        this.isLoading = false;
      }
    });
  }

  initForm(): void {
    this.dogForm = this.fb.group({
      nom: [this.currentDog.nom, [Validators.required, Validators.minLength(2)]],
      race: [this.currentDog.race, Validators.required],
      age: [this.currentDog.age, [Validators.required, Validators.pattern(/^\d+\s(ans?|mois)$/)]],
      sexe: [this.currentDog.sexe, Validators.required],
      taille: [this.currentDog.taille, [Validators.required, Validators.pattern(/^\d+\s(cm)$/)]],
      poids: [this.currentDog.poids, [Validators.required, Validators.pattern(/^\d+(\.\d+)?\s(kg)$/)]],
      statut: [this.currentDog.statutAdoption, Validators.required],
      date: [this.currentDog.dateArrivee, Validators.required],
      vaccin: [this.currentDog.vaccin],
      sterilise: [this.currentDog.sterilise],
      dents: [this.currentDog.dents],
      description: [this.currentDog.description, [Validators.required, Validators.minLength(20)]],
      photoUrl: [this.currentDog.photoUrl, Validators.required],
      type: ['Chien']
    });
  }

  onSubmit(): void {
    if (this.dogForm.invalid) {
      this.markFormGroupTouched(this.dogForm);
      this.message = 'Veuillez corriger les erreurs dans le formulaire';
      return;
    }

    this.isLoading = true;
    const updatedDog: FicheAnimal = {
      ...this.currentDog,
      ...this.dogForm.value
    };

    this.animalService.modifierAnimal(this.idAnimal, updatedDog).subscribe({
      next: () => {
        this.message = 'Chien modifié avec succès !';
        this.isLoading = false;
       this.router.navigate(['/admin/chiens']);
      },
      error: (err) => {
        console.error(err);
        this.message = 'Erreur lors de la modification';
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    if (this.dogForm.dirty) {
      if (confirm('Voulez-vous vraiment annuler ? Les modifications seront perdues.')) {
        this.router.navigate(['/admin/chiens']);
      }
    } else {
      this.router.navigate(['/admin/chiens']);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get f() { return this.dogForm.controls; }
}
