import { inject, Injectable } from '@angular/core';
import { UserApiService } from './user-api.service';
import { UserStoreService } from './user-store.service';
import { Observable, switchMap, tap } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserFacadeService {
  private _api: UserApiService = inject(UserApiService);
  private _store: UserStoreService = inject(UserStoreService);

  constructor() {}

  getAll$(): Observable<User[]> {
    return this._api
      .getAll$()
      .pipe(switchMap((users) => this._store.setAll$(users)));
  }

  post$(user: User) {
    this._api
      .post$(user)
      .pipe(tap((user: User) => this._store.add$(user)))
      .subscribe();
  }

  update$(user: User) {
    this._api
      .update$(user)
      .pipe(tap((user: User) => this._store.update$(user)))
      .subscribe();
  }

  delete$(userID: string) {
    this._api
      .delete$(userID)
      .pipe(tap(() => this._store.delete$(userID)))
      .subscribe();
  }
}
