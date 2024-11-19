import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private _users$ = new BehaviorSubject<User[]>([]); // Un BehaviorSubject pour stocker la liste des utilisateurs localement.

  constructor() {}

  /**
   * Met à jour la liste complète des utilisateurs dans le Store.
   * @param users - La nouvelle liste d'utilisateurs.
   * @returns Un Observable contenant la liste mise à jour.
   */
  setAll$(users: User[]): Observable<User[]> {
    this._users$.next(users); // Met à jour les utilisateurs stockés localement.
    return this._users$.asObservable(); // Renvoie un Observable de la liste mise à jour.
  }

  /**
   * Ajoute un nouvel utilisateur dans le Store local.
   * @param user - L'utilisateur à ajouter.
   */
  add$(user: User): void {
    this._users$.next([...this._users$.value, user]); // Ajoute l'utilisateur tout en conservant les autres.
  }

  /**
   * Met à jour un utilisateur dans le Store local.
   * @param user - L'utilisateur mis à jour, identifié par son `id`.
   */
  update$(user: User): void {
    const updatedUsers = this._users$.value.map((u) =>
      u.id === user.id ? user : u // Remplace l'utilisateur ayant le même ID par celui mis à jour.
    );
    this._users$.next(updatedUsers); // Met à jour le Store local.
  }

  /**
   * Supprime un utilisateur du Store local.
   * @param userID - L'ID de l'utilisateur à supprimer.
   */
  delete$(userID: string): void {
    const filteredUsers = this._users$.value.filter((u) => u.id !== userID); // Filtre les utilisateurs.
    this._users$.next(filteredUsers); // Met à jour la liste sans l'utilisateur supprimé.
  }
}

