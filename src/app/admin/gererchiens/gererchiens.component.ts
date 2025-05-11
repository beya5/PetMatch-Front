import { FicheAnimal } from './../../fiche-animal';
import { AnimalServiceService } from './../../animal-service.service';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-gererchiens',
  imports: [],
  templateUrl: './gererchiens.component.html',
  styleUrl: './gererchiens.component.css'
})
export class GererchiensComponent {
router:Router=inject(Router);
service:AnimalServiceService=inject(AnimalServiceService);
animaux:FicheAnimal[]=[];
ngOnInit(): void {
  this.service.getAnimauxParType("Chien").subscribe({
    next:(animaux)=>{
      this.animaux=animaux;
      console.log("Animaux:",animaux);
    },
    error:(err)=>{
      console.error("Erreur lors de la récupération des animaux",err);  }
    });


}
deleteDog(id:number){
this.service.deleteAnimal(id).subscribe({
  next:()=>{
    alert("Animal supprimé avec succès !");
  },
  error:(err)=>{
    console.error("Erreur lors de la suppression de l'animal",err);
  }
});
}

ajouterChien(){
  this.router.navigate(['/admin/ajouterChien']);}

  modifier(id:any){
    this.router.navigate(['/admin/modifierChien',id]);
  }
}
