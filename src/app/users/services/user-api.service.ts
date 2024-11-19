import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private _http = inject(HttpClient); // Injection du service HTTP d'Angular pour gérer les requêtes réseau.
  private readonly _BASE_API_URL: string = "http://localhost:3000/"; // URL de base pour accéder à l'API backend.

  /**
   * Récupère tous les utilisateurs depuis le backend via une requête GET.
   * @returns Un Observable contenant un tableau d'objets User.
   */
  getAll$(): Observable<User[]> {
    return this._http.get<User[]>(this._BASE_API_URL + "users");
  }

  /**
   * Ajoute un nouvel utilisateur au backend via une requête POST.
   * @param user - L'utilisateur à ajouter.
   * @returns Un Observable contenant l'utilisateur ajouté (confirmé par le backend).
   */
  post$(user: User): Observable<User> {
    return this._http.post<User>(this._BASE_API_URL + "users", user);
  }

  /**
   * Met à jour un utilisateur existant via une requête PUT.
   * @param user - L'utilisateur à mettre à jour, avec son `id`.
   * @returns Un Observable contenant l'utilisateur mis à jour.
   */
  update$(user: User): Observable<User> {
    return this._http.put<User>(this._BASE_API_URL + "users/" + user.id, user);
  }

  /**
   * Supprime un utilisateur par son ID via une requête DELETE.
   * @param userID - L'ID de l'utilisateur à supprimer.
   * @returns Un Observable contenant `void` une fois l'utilisateur supprimé.
   */
  delete$(userID: string): Observable<void> {
    return this._http.delete<void>(this._BASE_API_URL + "users/" + userID);
  }
}

