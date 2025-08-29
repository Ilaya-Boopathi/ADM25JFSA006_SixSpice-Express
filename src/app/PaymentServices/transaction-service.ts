import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { Transaction } from '../Models/transaction';
import { PaymentService } from './payment-service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient,private paymentService: PaymentService) {}

  private getCurrentUserId(): string | null {
    return localStorage.getItem('userId');
  }

  saveTransaction(transaction: Transaction): Observable<Transaction[]> {
    const userId = this.getCurrentUserId();
    if (!userId) throw new Error('User ID not found in localStorage');

    return this.http.get<any>(`${this.apiUrl}/users/${userId}`).pipe(
      switchMap(user => {
        const updatedTransactions = [...(user.transactions || []), transaction];
        return this.http.patch<any>(`${this.apiUrl}/users/${userId}`, {
          transactions: updatedTransactions
        });
      }),
      map(user => user.transactions)
    );
  }

  // ✅ New method to place order
  placeOrder(): Observable<string> {
  const userId = this.getCurrentUserId();
  const orderId = 'ORD' + Math.floor(Math.random() * 10000);
  const orderDate = new Date().toISOString().split('T')[0];

  this.paymentService.setOrderId(orderId);

  return this.http.get<any>(`${this.apiUrl}/users/${userId}`).pipe(
    switchMap(user => {
      const cartItems = user.cart || [];
      const restaurantId = cartItems[0]?.restaurantId;
      const restaurantName = cartItems[0]?.restaurant;
      const totalAmount = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

      const userOrder = {
        orderId,
        restaurantId,
        restaurant: restaurantName,
        orderDate,
        deliveryDate: orderDate,
        status: 'Pending',
        deliveryAgentName: '',
        deliveryAgentPhone: '',
        items: cartItems.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      const updatedUserOrders = [...(user.orders || []), userOrder];

      return this.http.patch(`${this.apiUrl}/users/${userId}`, {
        orders: updatedUserOrders
      }).pipe(
        switchMap(() => {
          return this.http.get<any>(`${this.apiUrl}/restaurants/${restaurantId}`).pipe(
            switchMap(restaurant => {
              const restaurantOrder = {
                orderId,
                customerName: user.profile.name,
                item: cartItems.map((i: any) => i.name).join(', '),
                status: 'Pending',
                total: totalAmount,
                assignedAgent: '',
                id: Math.random().toString(36).substring(2, 6),
                userId: userId
              };

              const updatedRestaurantOrders = [...(restaurant.orders || []), restaurantOrder];

              return this.http.patch(`${this.apiUrl}/restaurants/${restaurantId}`, {
                orders: updatedRestaurantOrders,
                overview: {
                  ...restaurant.overview,
                  totalOrdersToday: (restaurant.overview.totalOrdersToday || 0) + 1,
                  pendingOrders: (restaurant.overview.pendingOrders || 0) + 1,
                  totalRevenue: (restaurant.overview.totalRevenue || 0) + totalAmount
                }
              }).pipe(map(() => orderId)); // ✅ Return the generated orderId
            })
          );
        })
      );
    })
  );
}

}
