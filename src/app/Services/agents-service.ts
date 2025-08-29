import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentsModel } from '../Models/agents-model';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  private baseUrl = 'http://localhost:3000/restaurants';

  constructor(private http: HttpClient) {}

  getAgents(): Observable<AgentsModel[]> {
    const restaurantId = localStorage.getItem('restaurantId');
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(restaurants => {
        const restaurant = restaurants.find(r => r.id === restaurantId);
        return restaurant ? restaurant.deliveryAgents : [];
      })
    );
  }

  updateAgent(id: string, agent: AgentsModel): Observable<AgentsModel> {
    const restaurantId = localStorage.getItem('restaurantId');
    return this.http.get<any>(`${this.baseUrl}/${restaurantId}`).pipe(
      switchMap(restaurant => {
        const index = restaurant.deliveryAgents.findIndex((a: AgentsModel) => a.id === id);
        if (index !== -1) {
          restaurant.deliveryAgents[index] = agent;
        }
        return this.http.put<AgentsModel>(`${this.baseUrl}/${restaurantId}`, restaurant);
      })
    );
  }

  addAgent(agent: AgentsModel): Observable<any> {
    const restaurantId = localStorage.getItem('restaurantId');
    return this.http.get<any>(`${this.baseUrl}/${restaurantId}`).pipe(
      switchMap(restaurant => {
        restaurant.deliveryAgents.push(agent);
        return this.http.put(`${this.baseUrl}/${restaurantId}`, restaurant);
      })
    );
  }

  deleteAgent(id: string): Observable<void> {
    const restaurantId = localStorage.getItem('restaurantId');
    return this.http.get<any>(`${this.baseUrl}/${restaurantId}`).pipe(
      switchMap(restaurant => {
        restaurant.deliveryAgents = restaurant.deliveryAgents.filter((a: AgentsModel) => a.id !== id);
        return this.http.put<void>(`${this.baseUrl}/${restaurantId}`, restaurant);
      })
    );
  }

  getAgentById(id: string): Observable<AgentsModel> {
    const restaurantId = localStorage.getItem('restaurantId');
    return this.http.get<any>(`${this.baseUrl}/${restaurantId}`).pipe(
      map(restaurant => {
        return restaurant.deliveryAgents.find((a: AgentsModel) => a.id === id);
      })
    );
  }
}
