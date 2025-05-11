import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-adoption-updates',
  imports: [ReactiveFormsModule,DatePipe],
  templateUrl: './adoption-updates.component.html',
  styleUrl: './adoption-updates.component.css'
})
export class AdoptionUpdatesComponent implements OnInit {
  publications = signal<any[]>([]);
  animals = signal([
    { id: 101, name: 'Bella' },
    { id: 102, name: 'Max' },
    { id: 103, name: 'Mimi' },
    { id: 104, name: 'Tigrou' }
  ]);

  publicationForm: FormGroup;
  currentUserId: string = '';

  constructor(
    private userservice: UserService,
    private fb: FormBuilder
  ) {
    this.publicationForm = this.fb.group({
      ficheAnimalId: ['', Validators.required],
      contenu: ['', [Validators.required, Validators.minLength(10)]],
      typeNotification: ['Annonce adoption']
    });
  }

  ngOnInit(): void {
    // Récupère l'ID de l'utilisateur connecté
    this.currentUserId = this.userservice.getCurrentUserId();
    this.loadUserPublications();
  }

  loadUserPublications(): void {
    if (this.currentUserId) {
      this.userservice.getPublicationsByUser(this.currentUserId).subscribe({
        next: (data) => this.publications.set(data),
        error: (err) => console.error('Erreur de chargement', err)
      });
    }
  }

  onSubmit(): void {
    if (this.publicationForm.valid && this.currentUserId) {
      const newPublication: Omit<any, 'id'> = {
        ...this.publicationForm.value,
        adoptantId: this.currentUserId,
        dateEnvoi: new Date().toISOString(),
        statut: 'Publiée'
      };

      this.userservice.createPublication(newPublication).subscribe({
        next: () => {
          this.loadUserPublications();
          this.publicationForm.reset();
        },
        error: (err) => console.error('Erreur de publication', err)
      });
    }
  }

  getAnimalName(animalId: number): string {
    const animal = this.animals().find(a => a.id === animalId);
    return animal ? animal.name : 'Inconnu';
  }
}
