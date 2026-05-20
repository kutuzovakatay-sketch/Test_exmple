import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
   private apiurl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiurl);
  }

  getUser(id: string | number): Observable<User> {
    return this.http.get<User>(`${this.apiurl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiurl, user);
  }

  updateUser(id: string | number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiurl}/${id}`, user);
  }

  deleteUser(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/${id}`);
  }
}
