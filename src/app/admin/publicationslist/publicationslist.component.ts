import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../user.service';
import { AnimalServiceService } from '../../animal-service.service';

@Component({
  selector: 'app-publicationslist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publicationslist.component.html',
  styleUrls: ['./publicationslist.component.css']
})
export class PublicationslistComponent implements OnInit {
  animals: any[] = [];
  adoptants: any[] = [];
  publications: any[] = [];

  filteredPublications: any[] = [];

  selectedAnimal: string = '';
  selectedAdoptant: string = '';
  selectedDate: string = '';

  constructor(
    private UserService: UserService,
    private animalservice: AnimalServiceService
  ) {}

  ngOnInit(): void {
    this.animalservice.getAllAnimaux().subscribe(data => this.animals = data);
    this.UserService.getAdoptant().subscribe(data => this.adoptants = data);
    this.UserService.getPublications().subscribe(data => {
      this.publications = data;
      this.filteredPublications = data;
    });
  }

  applyFilters(): void {
    this.filteredPublications = this.publications.filter(pub => {
      const matchAnimal = !this.selectedAnimal || pub.ficheAnimal?.id == this.selectedAnimal;
      const matchAdoptant = !this.selectedAdoptant || pub.adoptant?.id == this.selectedAdoptant;
      const matchDate = !this.selectedDate || pub.dateEnvoi?.startsWith(this.selectedDate);
      return matchAnimal && matchAdoptant && matchDate;
    });
  }

  resetFilters(): void {
    this.selectedAnimal = '';
    this.selectedAdoptant = '';
    this.selectedDate = '';
    this.filteredPublications = [...this.publications];
  }

  deletePublication(id: any): void {
    this.UserService.deletePublication(id).subscribe({
      next: () => {
        this.publications = this.publications.filter(pub => pub.id !== id);
        this.applyFilters();
      },
      error: (err) => console.error('Erreur lors de la suppression de la publication :', err)
    });
  }
}
