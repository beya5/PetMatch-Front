import { AnimalServiceService } from './../../animal-service.service';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { FicheAnimal } from '../../fiche-animal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gerer-rendez-vous',
  imports: [ReactiveFormsModule,DatePipe],
  templateUrl: './gerer-rendez-vous.component.html',
  styleUrl: './gerer-rendez-vous.component.css'
})
export class GererRendezVousComponent implements OnInit {
  service: UserService = inject(UserService);
  animalService: AnimalServiceService = inject(AnimalServiceService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  rendezVous: any[] = [];
  adoptants: any[] = [];
  animaux: FicheAnimal[] = [];
  afficherRendezVous: boolean = false;
  statutFiltre: string = 'all';
  dateFiltre: string = '';

  ajouter: FormGroup = this.fb.group({
    idAnimal: ['', Validators.required],
    idAdoptant: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    statut: ['En attente', Validators.required]
  });

  ngOnInit(): void {
    this.chargerDonnees();
  }

  chargerDonnees(): void {
    this.service.getTousRendezVous().subscribe({
      next: (rendezVous) => this.rendezVous = rendezVous,
      error: (err) => console.error("Erreur lors de la récupération des rendez-vous", err)
    });

    this.service.getAdoptant().subscribe({
      next: (adoptant) => this.adoptants = adoptant,
      error: (err) => console.error("Erreur lors de la récupération des adoptants", err)
    });

    this.animalService.getAllAnimaux().subscribe({
      next: (animal) => this.animaux = animal,
      error: (err) => console.error("Erreur lors de la récupération des animaux", err)
    });
  }

  afficher(): void {
    this.afficherRendezVous = true;
    this.ajouter.reset({
      statut: 'En attente'
    });
  }

  annuler(): void {
    this.afficherRendezVous = false;
  }

  onSubmit(): void {
    if (this.ajouter.valid) {
      const formData = this.ajouter.value;
      const rendezVousData = {
        ...formData,
        date: `${formData.date}T${formData.time}:00`
      };

      this.service.ajouterRendezVous(rendezVousData).subscribe({
        next: () => {
          this.chargerDonnees();
          this.afficherRendezVous = false;
        },
        error: (err) => console.error("Erreur lors de l'ajout", err)
      });
    }
  }

  modifier(id: any): void {
    this.router.navigate(['/admin/ModifierRendezvous', id]);
  }

  changerStatut(id: any, nouveauStatut: string): void {
    this.service.modifierStatutRendezVous(id, nouveauStatut).subscribe({
      next: () => this.chargerDonnees(),
      error: (err) => console.error("Erreur lors du changement de statut", err)
    });
  }

  supprimer(id: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      this.service.supprimerRendezVous(id).subscribe({
        next: () => this.chargerDonnees(),
        error: (err) => console.error("Erreur lors de la suppression", err)
      });
    }
  }

  getNomAnimal(id: any): string {
    const animal = this.animaux.find(a => a.id === id);
    return animal ? animal.nom : 'Inconnu';
  }

  getNomAdoptant(id: any): string {
    const adoptant = this.adoptants.find(a => a.id === id);
    return adoptant ? `${adoptant.prenom} ${adoptant.nom}` : 'Inconnu';
  }

  filtrerRendezVous(): any[] {
    return this.rendezVous.filter(rdv => {
      const correspondStatut = this.statutFiltre === 'all' || rdv.statut === this.statutFiltre;
      const correspondDate = !this.dateFiltre || rdv.date.startsWith(this.dateFiltre);
      return correspondStatut && correspondDate;
    });
  }

  onStatutFilterChange(event: any): void {
    this.statutFiltre = event.target.value;
  }

  onDateFilterChange(event: any): void {
    this.dateFiltre = event.target.value;
  }
}
