import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private _http = inject(HttpClient);
  private readonly _BASE_API_URL : string = "http://localhost:3000/";

  getAll$(): Observable<User[]> {
    return this._http.get<User[]>(this._BASE_API_URL + "users");
  }

  post$(user: User) : Observable<User> {
    return this._http.post<User>(this._BASE_API_URL + "users", user);
  }

  update$(user : User) : Observable<User>{
    return this._http.put<User>(this._BASE_API_URL + "users/" + user.id, user)
  }

  delete$(userID : string) : Observable<void>{
    return this._http.delete<void>(this._BASE_API_URL + "users/" + userID)
  }
}
