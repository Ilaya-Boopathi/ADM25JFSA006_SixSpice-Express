import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from '../Models/food';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Fooddata {
  private baseUrl = 'http://localhost:3000/restaurants';

  constructor(private http: HttpClient) {}

  getFoods(): Observable<Food[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(restaurants => {
        const allFoods: Food[] = [];
        restaurants.forEach(r => {
          if (r.menuItems && Array.isArray(r.menuItems)) {
            allFoods.push(...r.menuItems);
          }
        });
        return allFoods;
      })
    );
  }
}
