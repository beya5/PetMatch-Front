import { FicheAnimal } from './../../fiche-animal';
import { AnimalServiceService } from './../../animal-service.service';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-gererchats',
  imports: [],
  templateUrl: './gererchats.component.html',
  styleUrl: './gererchats.component.css'
})
export class GererchatsComponent {
router:Router=inject(Router);
service:AnimalServiceService=inject(AnimalServiceService);
animaux:FicheAnimal[]=[];
ngOnInit(): void {
  this.service.getAnimauxParType("Chat").subscribe({
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
openModal(){
  this.router.navigate(['/admin/ajouterChat']);
}
modifier(id:number){
  this.router.navigate(['/admin/modifierChat',id]);
}
}
