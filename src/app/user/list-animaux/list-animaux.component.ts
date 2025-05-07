import { Component, inject } from '@angular/core';
import { FicheAnimal } from '../../fiche-animal';
import { AnimalServiceService } from '../../animal-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-animaux',
  imports: [],
  templateUrl: './list-animaux.component.html',
  styleUrl: './list-animaux.component.css'
})
export class ListAnimauxComponent {


ListeAnimaux!:FicheAnimal[];
service:AnimalServiceService=inject(AnimalServiceService);
router:Router=inject(Router);
activatedRoute:ActivatedRoute=inject(ActivatedRoute);
type:string=this.activatedRoute.snapshot.params['type'];
resultatsRecherche!:FicheAnimal[];
ngOnInit(): void {
this.service.getAnimauxParType(this.type).subscribe(data=>{
  this.ListeAnimaux=data;
  console.log(data)

})}
chercher(race:string){
this.service.rechercherAnimauxParRace(this.type, race).subscribe(resultats => {
  this.ListeAnimaux = resultats;
});
}

filtrerParAge(age :string){
  if (age != 'Tous les âges') {
    this.ListeAnimaux = this.service.rechercherParAge(this.ListeAnimaux, age);
  }
}
filtrerParSexe(sexe: string) {
  if (sexe !='') {

    this.ListeAnimaux = this.ListeAnimaux.filter(animal => animal.sexe.toLowerCase() === sexe.toLowerCase());
  }
}
filtrerParCaractere(motCle: string) {

    this.ListeAnimaux = this.ListeAnimaux.filter(animal =>
      animal.description.toLowerCase().includes(motCle.toLowerCase())
    );

}


details(id: number) {
this.router.navigate(['detail', id]); }
}
