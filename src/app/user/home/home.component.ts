
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  ListeCateg:any[]=[]
  ngOnInit(): void {

this.service.getCategories().subscribe(data=>{
  this.ListeCateg=data;
  console.log(data)
})
  }
}
