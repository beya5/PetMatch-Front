import { FicheAnimal } from './fiche-animal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataUrl = "http://localhost:3000/adoptants";
private currentUserId:any= null;

  setCurrentUserId(id: any) {
  this.currentUserId = id;
  localStorage.setItem('currentUserId', id);
}

getCurrentUserId(): any {
  if (!this.currentUserId) {
    this.currentUserId = localStorage.getItem('currentUserId');
  }
  return this.currentUserId;
}

  constructor(private http: HttpClient) { }
 connecter(email: string, password: string): Observable<any> {
  return this.http.get<any[]>(`${this.dataUrl}?email=${email}&mdp=${password}`).pipe(
    map(users => {
      if (!users.length) return [];
      const user = users[0];
      return [{
        id: user.id,
        role: user.role || 'adoptant', // ou admin selon ton JSON
        email: user.email,
        nom: user.nom,
        prenom: user.prenom
      }];
    }),
    catchError(err => {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      return of([]);
    })
  );
}

  creerCompte(user: any): Observable<any> {
    const compte = {
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      mdp: user.password,
      role: "adoptant",}
    return this.http.post<any>("http://localhost:8081/adoptants", compte);
  }
  saveAdoptant(data: any): Observable<any> {
    return this.http.post("http://localhost:3000/questionnairesAdoptant", data);
  }
   creerDemande(demande: any) : Observable<any> {
    return this.http.post<any>("http://localhost:3000/DemandeAdoption", demande);
  }
  getMesDemandes(id:any):Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/DemandeAdoption?adoptantId=${id}`)

}
annulerDemande(demandeId: any): Observable<any> {
  return this.http.delete<any>(`http://localhost:3000/DemandeAdoption/${demandeId}`);

}
getAnimauxByIds(ids: any[]): Observable<FicheAnimal[]> {
  const params = ids.map(id => `id=${id}`).join('&');
  return this.http.get<FicheAnimal[]>(`http://localhost:3000/ficheAnimaux?${params}`);
}
getUserById(id: any):Observable<any> {
  return this.http.get<any>(` http://localhost:3000/adoptants/${id}`)
}

getTousRendezVous(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/Rendez-vous`);
  }

  // Fonction pour ajouter un nouveau rendez-vous
  ajouterRendezVous(rendezVous: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/Rendez-vous`, rendezVous);
  }

  // Fonction pour supprimer un rendez-vous
  supprimerRendezVous(id: any): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/Rendez-vous/${id}`);
  }

  // Fonction pour accepter un rendez-vous
  accepterRendezVous(id: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/Rendez-vous/${id}/accepter`, {});
  }

  // Fonction pour refuser un rendez-vous
  refuserRendezVous(id: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/Rendez-vous/${id}/refuser`, {});
  }
  getAdoptant(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/adoptants`);
  }
modifierStatutRendezVous(id: any, nouveauStatut: string): Observable<any> {
    return this.http.patch(`http://localhost:3000/Rendez-vous/${id}`, {
      statut: nouveauStatut
    });
  }

 getPublicationsByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/publications?adoptantId=${userId}`);
  }

  createPublication(publication: Omit<any, 'id'>): Observable<any> {
    return this.http.post<any>("http://localhost:3000/publications", publication);
  }
changerMotDePasse(userId: any, ancienMotDePasse: string, nouveauMotDePasse: string): Observable<any> {
  const body = {
    ancienMotDePasse: ancienMotDePasse,
    nouveauMotDePasse: nouveauMotDePasse
  };
  return this.http.put(`http://localhost:3000/adoptants${userId}/changer-mot-de-passe`, body);
}
getPublications(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:8081/publications');
}

deletePublication(id: any): Observable<void> {
  return this.http.delete<void>(`http://localhost:3000/publications/${id}`);
}
}
