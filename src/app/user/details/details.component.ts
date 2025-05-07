import { Component, inject } from '@angular/core';
import { FicheAnimal } from '../../fiche-animal';
import { AnimalServiceService } from '../../animal-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
animal!:FicheAnimal;
service:AnimalServiceService=inject(AnimalServiceService);
activatedRoute:ActivatedRoute=inject(ActivatedRoute);
route:Router=inject(Router);
id:number=this.activatedRoute.snapshot.params['id'];
ngOnInit(): void {
  console.log(this.id);
  this.service.getAnimalParId(this.id).subscribe({
    next:(data)=>{
      this.animal=data;
      console.log(this.animal);
    }
  });

}
}
