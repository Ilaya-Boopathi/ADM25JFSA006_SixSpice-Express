import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserModel } from '../Models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Get full user data by ID
  getUserById(userId: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}/${userId}`);
  }

  // Update full user data (including profile)
  updateUser(userId: string, updatedUser: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.baseUrl}/${userId}`, updatedUser);
  }

  // Get only orders by user ID
  getOrdersByUserId(userId: string): Observable<any[]> {
    return this.http.get<UserModel>(`${this.baseUrl}/${userId}`).pipe(
      map(user => user?.orders || [])
    );
  }
}
