
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalServiceService } from '../../animal-service.service';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  router:Router=inject(Router);
  service:AnimalServiceService=inject(AnimalServiceService);
  ListeCateg:any[]=[];
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  ngOnInit(): void {

this.service.getTypesAnimaux().subscribe(data=>{
  this.ListeCateg=data;
  console.log(data)
})
  }

  navigateToList(type: string) {
    const idUser = this.activatedRoute.snapshot.paramMap.get('idUser');
    if (idUser) {
      this.router.navigate(['/home', idUser, 'list', type]);
    } else {
      this.router.navigate(['/list', type]);
    }
  }

}
