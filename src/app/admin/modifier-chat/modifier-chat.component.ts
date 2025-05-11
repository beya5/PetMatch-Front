import { Component, inject, OnInit } from '@angular/core';
import { AnimalServiceService } from '../../animal-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FicheAnimal } from '../../fiche-animal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifier-chat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './modifier-chat.component.html',
  styleUrls: ['./modifier-chat.component.css']
})
export class ModifierChatComponent implements OnInit {
  private animalService = inject(AnimalServiceService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  catForm: FormGroup;
  currentCat: FicheAnimal | null = null;
  message: string = '';
  isLoading: boolean = false;
  idAnimal: number | null = null;

  constructor() {
    this.catForm = this.fb.group({});
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam || isNaN(+idParam)) {
      console.error('Invalid animal ID:', idParam);
      this.router.navigate(['/admin/chats']);
      return;
    }

    this.idAnimal = +idParam;
    this.loadAnimalData();
  }

  private loadAnimalData(): void {
    if (this.idAnimal === null) return;

    this.isLoading = true;
    this.animalService.getAnimalParId(this.idAnimal).subscribe({
      next: (animal) => {
        this.currentCat = animal;
        this.initForm();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading cat data', err);
        this.message = 'Erreur lors du chargement des données du chat';
        this.isLoading = false;
        this.router.navigate(['/admin/chats']);
      }
    });
  }

  private initForm(): void {
    if (!this.currentCat) return;

    this.catForm = this.fb.group({
      nom: [
        this.currentCat.nom || '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
      ],
      race: [
        this.currentCat.race || '',
        Validators.required
      ],
      age: [
        this.currentCat.age || '',
        [Validators.required, Validators.pattern(/^\d+\s(ans?|mois)$/)]
      ],
      sexe: [
        this.currentCat.sexe || '',
        Validators.required
      ],
      taille: [
        this.currentCat.taille || '',
        [Validators.required, Validators.pattern(/^\d+\s(cm)$/)]
      ],
      poids: [
        this.currentCat.poids || '',
        [Validators.required, Validators.pattern(/^\d+(\.\d+)?\s(kg)$/)]
      ],
      statut: [
        this.currentCat.statutAdoption || 'Disponible',
        Validators.required
      ],
      date: [
        this.currentCat.dateArrivee || '',
        Validators.required
      ],
      vaccin: [
        this.currentCat.vaccin || '' ],
      sterilise: [
        this.currentCat.sterilise || false
      ],
      dents: [
        this.currentCat.dents || 'Dents saines'
      ],
      description: [
        this.currentCat.description || '',
        [Validators.required, Validators.minLength(20), Validators.maxLength(500)]
      ],
      photoUrl: [
        this.currentCat.photoUrl || '',
        [Validators.required, Validators.pattern(/^(http|https):\/\/.+/)]
      ]
    });
  }

  onSubmit(): void {
    if (this.catForm.invalid || !this.currentCat || this.idAnimal === null) {
      this.markFormGroupTouched(this.catForm);
      this.message = 'Veuillez corriger les erreurs dans le formulaire';
      return;
    }

    this.isLoading = true;
    const updatedCat: FicheAnimal = {
      ...this.currentCat,
      ...this.catForm.value,
      type: 'Chat'
    };

    this.animalService.modifierAnimal(this.idAnimal, updatedCat).subscribe({
      next: () => {
        this.message = 'Chat mis à jour avec succès !';
        setTimeout(() => this.router.navigate(['/admin/chats']), 1500);
      },
      error: (err) => {
        console.error('Error updating cat', err);
        this.message = 'Erreur lors de la mise à jour du chat';
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    if (this.catForm.dirty) {
      if (confirm('Voulez-vous vraiment annuler les modifications ?')) {
        this.router.navigate(['/admin/chats']);
      }
    } else {
      this.router.navigate(['/admin/chats']);
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
}
