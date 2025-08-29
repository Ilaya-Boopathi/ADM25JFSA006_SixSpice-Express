import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OverviewModel } from '../Models/overview-model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  private baseUrl = "http://localhost:3000/restaurants";

  constructor(private http: HttpClient){}

  getData(): Observable<OverviewModel | null> {
  const restaurantId = localStorage.getItem('restaurantId');

  return this.http.get<any[]>(`${this.baseUrl}`).pipe(
    map(restaurants => {
      const restaurant = restaurants.find(r => r.id === restaurantId);
      return restaurant ? restaurant.overview : null;
    })
  );
}


  
  updateData(data: Partial<OverviewModel>): Observable<OverviewModel> {
  const restaurantId = localStorage.getItem('restaurantId');
  return this.http.put<OverviewModel>(`${this.baseUrl}/${restaurantId}/overview`, data);
}


}
