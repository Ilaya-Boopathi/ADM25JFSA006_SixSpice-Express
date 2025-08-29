import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuModel } from '../Models/menu-model';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = "http://localhost:3000/restaurants";

  constructor(private http: HttpClient){}

  getMenuItems(): Observable<MenuModel[]> {
    const restaurantId = localStorage.getItem('restaurantId');
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(restaurants => {
        const restaurant = restaurants.find(r => r.id === restaurantId);
        return restaurant ? restaurant.menuItems : [];
      })
    );
  }

  addMenuItem(item: MenuModel): Observable<MenuModel> {
    const restaurantId = localStorage.getItem('restaurantId');
    return this.http.get<any>(`${this.baseUrl}/${restaurantId}`).pipe(
      switchMap(restaurant => {
        restaurant.menuItems.push(item);
        return this.http.put<MenuModel>(`${this.baseUrl}/${restaurantId}`, restaurant);
      })
    );
  }

  updateMenuItem(id: string, item: MenuModel): Observable<MenuModel> {
    const restaurantId = localStorage.getItem('restaurantId');
    return this.http.get<any>(`${this.baseUrl}/${restaurantId}`).pipe(
      switchMap(restaurant => {
        const index = restaurant.menuItems.findIndex((m: MenuModel) => m.id === id);
        if (index !== -1) {
          restaurant.menuItems[index] = item;
        }
        return this.http.put<MenuModel>(`${this.baseUrl}/${restaurantId}`, restaurant);
      })
    );
  }

  deleteMenuItem(id: string): Observable<void> {
    const restaurantId = localStorage.getItem('restaurantId');
    return this.http.get<any>(`${this.baseUrl}/${restaurantId}`).pipe(
      switchMap(restaurant => {
        restaurant.menuItems = restaurant.menuItems.filter((m: MenuModel) => m.id !== id);
        return this.http.put<void>(`${this.baseUrl}/${restaurantId}`, restaurant);
      })
    );
  }
}
