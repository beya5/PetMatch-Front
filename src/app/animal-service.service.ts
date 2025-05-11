import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FicheAnimal } from './fiche-animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalServiceService {
  private baseUrl = "http://localhost:8081/animaux";

  constructor(private http: HttpClient) {}

  getAllAnimaux(): Observable<FicheAnimal[]> {
    return this.http.get<FicheAnimal[]>(this.baseUrl);
  }

  getTypesAnimaux(): Observable<{ type: string, image: string }[]> {
    return this.getAllAnimaux().pipe(
      map(animaux => {
        const typeMap = new Map<string, string>();

        for (const animal of animaux) {
          if (!typeMap.has(animal.type)) {
            typeMap.set(animal.type, animal.photoUrl);
          }
        }

        return Array.from(typeMap.entries()).map(([type, image]) => ({ type, image }));
      })
    );
  }

  getAnimauxParType(type: string): Observable<FicheAnimal[]> {
    return this.getAllAnimaux().pipe(
      map(animaux => animaux.filter(animal => animal.type.toLowerCase() === type.toLowerCase()))
    );
  }

rechercherAnimauxParRace(type: string, recherche: string): Observable<FicheAnimal[]> {
  return this.getAllAnimaux().pipe(
    map(animaux =>
      animaux.filter(animal =>
        animal.type.toLowerCase() === type.toLowerCase() &&
        animal.race.toLowerCase().includes(recherche.toLowerCase())
      )
    )
  );
}

rechercherParAge(animaux: FicheAnimal[], age: string): FicheAnimal[] {
  try {
    return animaux.filter(animal => {
      const ageNum = this.extraireAge(animal.age);

      if (age.includes('-')) {
        const [min, max] = age.split('-').map(Number);
        return ageNum >= min && ageNum <= max;
      }

      if (age.startsWith('+')) {
        const min = parseInt(age.slice(1), 10);
        return ageNum > min;
      }

      return true;
    });
  } catch (error) {
    console.error("Erreur lors de l'extraction de l'âge : ", error);
    return [];
  }
}

private extraireAge(texte: string): number {
  const match = texte.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

  getAnimalParId(id: number): Observable<FicheAnimal> {
    return this.http.get<FicheAnimal>(`${this.baseUrl}/${id}`);
  }

  deleteAnimal(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  ajouterAnimal(data: FicheAnimal): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = { 'Authorization': `Bearer ${token}` }; // Ajouter le token à l'en-tête
    return this.http.post(this.baseUrl, data);
  }

  modifierAnimal(id: number, data: FicheAnimal): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  rechercherAnimauxParRace2( recherche: string): Observable<FicheAnimal[]> {
  return this.getAllAnimaux().pipe(
    map(animaux =>
      animaux.filter(animal =>
        animal.race.toLowerCase().includes(recherche.toLowerCase())
      )
    )
  );
}
}
