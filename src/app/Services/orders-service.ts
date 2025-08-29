import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { OrdersModel } from '../Models/orders-model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = "http://localhost:3000/restaurants";

  constructor(private http: HttpClient) {}

  private getRestaurantId(): string | null {
    return localStorage.getItem('restaurantId');
  }

  getOrders(): Observable<OrdersModel[]> {
    const restaurantId = this.getRestaurantId();

    return this.http.get<any>(`${this.baseUrl}/${restaurantId}`).pipe(
      map(restaurant => restaurant.orders || [])
    );
  }

  updateOrder(orderId: string, updatedOrder: OrdersModel): Observable<OrdersModel> {
    const restaurantId = this.getRestaurantId();

    return this.http.get<any>(`${this.baseUrl}/${restaurantId}`).pipe(
      map(restaurant => {
        const updatedOrders = restaurant.orders.map((order: OrdersModel) =>
          order.orderId === orderId ? updatedOrder : order
        );
        return updatedOrders;
      }),
      switchMap(updatedOrders =>
        this.http.patch<any>(`${this.baseUrl}/${restaurantId}`, {
          orders: updatedOrders
        })
      ),
      map(() => updatedOrder)
    );
  }

  updateUserOrder(userId: string, orderId: string, updatedOrder: any): Observable<any> {
  return this.http.get<any>(`http://localhost:3000/users/${userId}`).pipe(
    map(user => {
      const updatedOrders = user.orders.map((order: any) =>
        order.orderId === orderId
          ? {
              ...order,
              status: updatedOrder.status,
              deliveryAgentName: updatedOrder.deliveryAgentName || order.deliveryAgentName,
              deliveryAgentPhone: updatedOrder.deliveryAgentPhone || order.deliveryAgentPhone
            }
          : order
      );
      return updatedOrders;
    }),
    switchMap(updatedOrders =>
      this.http.patch<any>(`http://localhost:3000/users/${userId}`, {
        orders: updatedOrders
      })
    )
  );
}



}
