import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class Auth {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  registerRestaurant(restaurant: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/restaurants`, restaurant);
  }


  loginUser(email: string, password: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users?email=${email}&password=${password}`);
  }



  loginRestaurant(email: string, password: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/restaurants?email=${email}&password=${password}`);
  }



  getUsers() {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }
    
  getRestaurants() {
    return this.http.get<any[]>(`${this.baseUrl}/restaurants`);
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  isRestaurantLoggedIn(): boolean {
    return !!localStorage.getItem('restaurantId');
  }

}