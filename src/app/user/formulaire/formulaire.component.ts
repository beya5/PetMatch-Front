import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulaire',
  imports: [ReactiveFormsModule],
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent {
  adoptionForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  service: UserService = inject(UserService);
  router: Router = inject(Router);
  activatedRoute:ActivatedRoute = inject(ActivatedRoute);
  idAnimal = this.activatedRoute.snapshot.params['animalId'];
  idUser = this.activatedRoute.snapshot.params['idUser'];
  ngOnInit(): void {
    this.adoptionForm = this.fb.group({
      logement: ['', Validators.required],
      statut: ['', Validators.required],
      surface: [0, Validators.required],
      children: [false],
      seniors: [false],
      animaux: [0, Validators.required],
      experience: ['', Validators.required],
      dejaAdopte: [''],
      couts: ['', Validators.required],
      engagement: ['', Validators.required],
      temps: ['', Validators.required],
      responsable: [''],
      motivation: [''],

    });
  }
onSubmit(): void {
  if (this.adoptionForm.valid) {
    const formData = {
      ...this.adoptionForm.value,
      adoptantId:this.idUser,
    };

    this.service.saveAdoptant(formData).subscribe({
      next: () => {
        alert("Demande envoyée avec succès !");
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erreur lors de la soumission', err);
      }
    });

    const demandeAdoption = {
      adoptantId:this.idUser,
      ficheAnimalId:this.idAnimal,
      dateDemande: new Date().toISOString().split('T')[0],
      statut: 'En attente'
    };

    this.service.creerDemande(demandeAdoption).subscribe({
      next: () => {
        alert('Demande créée avec succès !');
        this.router.navigate(['/home', this.idUser, 'suiviDemande']);
      },
      error: (err) => {
        console.error('Erreur:', err);
        alert('Échec de la création de la demande');
      }
    });
  } else {
    alert('Veuillez remplir tous les champs requis.');
  }
}

}
