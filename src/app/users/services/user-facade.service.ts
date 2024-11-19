import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { UserStoreService } from './user-store.service';
import { Observable, switchMap, tap } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService {
  private _api: UserApiService = inject(UserApiService); // Accès au service API pour communiquer avec le backend.
  private _store: UserStoreService = inject(UserStoreService); // Accès au Store local pour synchroniser les données.

  constructor() {}

  /**
   * Récupère tous les utilisateurs en synchronisant le Store avec l'API.
   * @returns Un Observable contenant la liste des utilisateurs.
   */
  getAll$(): Observable<User[]> {
    return this._api
      .getAll$() // Requête pour récupérer tous les utilisateurs depuis l'API.
      .pipe(
        switchMap((users) => this._store.setAll$(users)) // Met à jour le Store avec les utilisateurs récupérés.
      );
  }

  /**
   * Ajoute un nouvel utilisateur en synchronisant l'API et le Store.
   * @param user - L'utilisateur à ajouter.
   */
  post$(user: User) {
    this._api
      .post$(user) // Envoie une requête POST à l'API.
      .pipe(
        tap((user: User) => this._store.add$(user)) // Une fois ajouté, met à jour le Store local.
      )
      .subscribe(); // Lance l'opération (nécessaire car c'est un Observable chaud).
  }

  /**
   * Met à jour un utilisateur en synchronisant l'API et le Store.
   * @param user - L'utilisateur mis à jour.
   */
  update$(user: User) {
    this._api
      .update$(user) // Envoie une requête PUT à l'API.
      .pipe(
        tap((user: User) => this._store.update$(user)) // Une fois mis à jour, met à jour le Store local.
      )
      .subscribe(); // Lance l'opération.
  }

  /**
   * Supprime un utilisateur en synchronisant l'API et le Store.
   * @param userID - L'ID de l'utilisateur à supprimer.
   */
  delete$(userID: string) {
    this._api
      .delete$(userID) // Envoie une requête DELETE à l'API.
      .pipe(
        tap(() => this._store.delete$(userID)) // Une fois supprimé, met à jour le Store local.
      )
      .subscribe(); // Lance l'opération.
  }
}

