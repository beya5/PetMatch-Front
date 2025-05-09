import { FicheAnimal } from './fiche-animal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataUrl = "http://localhost:3000/adoptants";

  constructor(private http: HttpClient) { }
  connecter(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.dataUrl}?email=${email}&mdp=${password}`)

  }
  creerCompte(user: any): Observable<any> {
    const compte = {
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      mdp: user.password,
      role: "adoptant",}
    return this.http.post<any>(this.dataUrl, compte);
  }
  saveAdoptant(data: any): Observable<any> {
    return this.http.post("http://localhost:3000/questionnairesAdoptant", data);
  }
   creerDemande(demande: any) : Observable<any> {
    return this.http.post<any>("http://localhost:3000/DemandeAdoption", demande);
  }
  getMesDemandes(id:number):Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/DemandeAdoption?adoptantId=${id}`)

}
annulerDemande(demandeId: number): Observable<any> {
  return this.http.delete<any>(`http://localhost:3000/DemandeAdoption/${demandeId}`);

}
getAnimauxByIds(ids: number[]): Observable<FicheAnimal[]> {
  const params = ids.map(id => `id=${id}`).join('&');
  return this.http.get<FicheAnimal[]>(`http://localhost:3000/ficheAnimaux?${params}`);
}

}
