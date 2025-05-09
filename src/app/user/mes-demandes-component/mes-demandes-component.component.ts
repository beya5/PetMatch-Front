import { FicheAnimal } from './../../fiche-animal';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../user.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-mes-demandes-component',
  templateUrl: './mes-demandes-component.component.html',
  styleUrls: ['./mes-demandes-component.component.css']
})
export class MesDemandesComponentComponent {
  service: UserService = inject(UserService);
  router: Router = inject(Router);
  demandes: any[] = [];
  animaux: FicheAnimal[] = [];
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  idUser = this.activatedRoute.snapshot.params['idUser'];

  ngOnInit(): void {
    this.loadDemandesEtAnimaux();
  }

  loadDemandesEtAnimaux(): void {
    // 1. Récupérer les demandes
    this.service.getMesDemandes(this.idUser).subscribe({
      next: (demandes) => {
        this.demandes = demandes;
        console.log('Demandes:', demandes);

        const animalIds = [...new Set(demandes.map(d => d.ficheAnimalId))];

        if (animalIds.length > 0) {
          this.service.getAnimauxByIds(animalIds).subscribe({
            next: (animaux) => {
              this.animaux = animaux;
              console.log('Animaux:', animaux);
            },
            error: (err) => {
              console.error('Erreur lors de la récupération des animaux', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des demandes', err);
      }
    });
  }

  getAnimalById(animalId: number): FicheAnimal | undefined {
    return this.animaux.find(a => a.id === animalId);
  }

  annulerDemande(demandeId: number): void {
    if (confirm('Êtes-vous sûr de vouloir annuler cette demande ?')) {
      this.service.annulerDemande(demandeId).subscribe({
        next: () => {
          alert("Demande annulée avec succès !");
          this.loadDemandesEtAnimaux();
        },
        error: (err) => {
          console.error('Erreur lors de l\'annulation de la demande', err);
        }
      });
    }
  }
}
