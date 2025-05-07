import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dataUrl = "http://localhost:3000/adoptants";

  constructor(private http: HttpClient) { }
  connecter(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.dataUrl}?email=${email}&mdp=${password}`).pipe(
      map(result => result && result.length > 0), // true si résultat non vide
      catchError(() => of(false)) // false en cas d’erreur
    );
  }

}
