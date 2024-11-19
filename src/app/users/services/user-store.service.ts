import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private _users$ = new BehaviorSubject<User[]>([]);

  constructor() {}

  setAll$(users: User[]): Observable<User[]> {
    this._users$.next(users);
    return this._users$.asObservable();
  }

  add$(user: User): void {
    this._users$.next([...this._users$.value, user]);
  }

  update$(user: User): void {
    const updateUsers = this._users$.value.map((u) =>
      u.id === user.id ? user : u
    );
    this._users$.next(updateUsers);
  }

  delete$(userID: string): void {
    const deleteUsers = this._users$.value.filter((u) => u.id !== userID);
    this._users$.next(deleteUsers);
  }
}
