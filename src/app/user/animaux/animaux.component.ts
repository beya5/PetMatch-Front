import { Component, inject } from '@angular/core';
import { FicheAnimal } from '../../fiche-animal';
import { AnimalServiceService } from '../../animal-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-animaux',
  templateUrl: './animaux.component.html',
  styleUrls: ['./animaux.component.css']  // Corrigé de 'styleUrl' à 'styleUrls'
})
export class AnimauxComponent {
  ListeAnimaux!: FicheAnimal[];
  resultatsRecherche!: FicheAnimal[];

  // Injection des services
  service: AnimalServiceService = inject(AnimalServiceService);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  type: string = this.activatedRoute.snapshot.params['type'];

  ngOnInit(): void {
    this.service.getAllAnimaux().subscribe({
      next: (data) => {
        this.ListeAnimaux = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des animaux', err);
      }
    });
  }

  // Recherche par race
  chercher(race: string): void {
    this.service.rechercherAnimauxParRace2(race).subscribe({
      next: (resultats) => {
        this.ListeAnimaux = resultats;
      },
      error: (err) => {
        console.error('Erreur lors de la recherche par race', err);
      }
    });
  }

  // Filtrer par âge
  filtrerParAge(age: string): void {
    if (age !== 'Tous les âges') {
      this.ListeAnimaux = this.service.rechercherParAge(this.ListeAnimaux, age);
    }
  }

  // Filtrer par sexe
  filtrerParSexe(sexe: string): void {
    if (sexe !== '') {
      this.ListeAnimaux = this.ListeAnimaux.filter(animal => animal.sexe.toLowerCase() === sexe.toLowerCase());
    }
  }

  // Filtrer par caractère (mot-clé dans la description)
  filtrerParCaractere(motCle: string): void {
    if (motCle) {
      this.ListeAnimaux = this.ListeAnimaux.filter(animal =>
        animal.description.toLowerCase().includes(motCle.toLowerCase())
      );
    }
  }

  // Accéder aux détails d'un animal
  details(id: number): void {
    const idUser = this.activatedRoute.snapshot.paramMap.get('idUser');

    if (idUser) {
      this.router.navigate(['/home', idUser, 'detail', id]);
    } else {
      this.router.navigate(['detail', id]);
    }
  }
}
