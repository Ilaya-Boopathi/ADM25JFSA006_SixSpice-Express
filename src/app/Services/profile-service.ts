import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { OverviewModel } from '../Models/overview-model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:3000/restaurants';

  constructor(private http: HttpClient) {}

  getRestaurantData(): Observable<OverviewModel> {
    const restaurantId = localStorage.getItem('restaurantId');
    return this.http.get<any>(`${this.baseUrl}/${restaurantId}`).pipe(
      map(restaurant => restaurant.overview)
    );
  }

  updateProfile(updatedData: OverviewModel): Observable<OverviewModel> {
    const restaurantId = localStorage.getItem('restaurantId');
    return this.http.get<any>(`${this.baseUrl}/${restaurantId}`).pipe(
      switchMap(restaurant => {
        restaurant.overview = updatedData;
        return this.http.put<OverviewModel>(`${this.baseUrl}/${restaurantId}`, restaurant);
      })
    );
  }
}
