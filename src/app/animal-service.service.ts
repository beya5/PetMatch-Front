import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FicheAnimal } from './fiche-animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalServiceService {
  private dataUrl = "http://localhost:3000/ficheAnimaux";

  constructor(private http: HttpClient) { }
  getAllAnimaux(): Observable<FicheAnimal[]> {
    return this.http.get<FicheAnimal[]>(this.dataUrl);
  }
  getTypesAnimaux(): Observable<{ type: string, image: string }[]> {
    return this.getAllAnimaux().pipe(
      map(animaux => {
        const typeMap = new Map<string, string>();

        for (const animal of animaux) {
          if (!typeMap.has(animal.type)) {
            typeMap.set(animal.type, animal.photos);
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
  }

  private extraireAge(texte: string): number {
    const match = texte.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  getAnimalParId(id: number): Observable<FicheAnimal> {
    return this.http.get<FicheAnimal>(`http://localhost:3000/ficheAnimaux/${id}`);
  }

}
