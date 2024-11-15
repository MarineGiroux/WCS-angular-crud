import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserList } from '../models/user.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private _http = inject(HttpClient);
  private readonly _BASE_API_URL = '/db/db.json';
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor() {
    this.loadUsers();
  }

  private loadUsers() {
    this._http
      .get<UserList>(this._BASE_API_URL)
      .pipe(
        map((response) => {
          const apiUsers = response.users;
          const localUsers = this.getFromLocalStorage('users');
          const allUsers = this.mergeUsers(apiUsers, localUsers);
          return allUsers;
        })
      )
      .subscribe((users) => {
        this.usersSubject.next(users);
      });
  }

  private mergeUsers(apiUsers: User[], localUsers: User[]): User[] {
    const userMap = new Map<string, User>();
    localUsers.forEach((user) => userMap.set(user.id, user));
  
    apiUsers.forEach((user) => {
      if (!userMap.has(user.id)) {
        userMap.set(user.id, user);
      }
    });
  
    return Array.from(userMap.values());
  }


  create(user: User) {
    const currentUsers = this.usersSubject.value;
    currentUsers.push(user);
    this.usersSubject.next(currentUsers);
    localStorage.setItem('users', JSON.stringify(currentUsers));
  }

  delete(user: User) {
    const currentUsers = this.usersSubject.value.filter(
      (u) => u.id !== user.id
    );
    this.usersSubject.next(currentUsers);
    localStorage.setItem('users', JSON.stringify(currentUsers));
  }

  update(user: User) {
    const currentUsers = this.usersSubject.value.map((u) =>
      u.id === user.id ? { ...u, ...user } : u
    );
    this.usersSubject.next(currentUsers);
    localStorage.setItem('users', JSON.stringify(currentUsers));
  }

  getFromLocalStorage(item: string): User[] {
    const stringData = localStorage.getItem(item);
    return JSON.parse(stringData || '[]');
  }

}
