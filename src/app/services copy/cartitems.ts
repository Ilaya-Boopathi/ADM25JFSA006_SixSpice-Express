import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { CartItem } from '../Models/cart-item';
import { UserModel } from '../Models/users';

@Injectable({
  providedIn: 'root'
})
export class Cartitems {
  private apiUrl = 'http://localhost:3000/users';
  cartTotal : number = 0;

  constructor(private http: HttpClient) {}

  private getCurrentUserId(): string | null {
    return localStorage.getItem('userId');
  }

  calculateTotal(cart: CartItem[]): number {
    this.cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return this.cartTotal;
  }

  getTotalAmount(): Observable<number> {
    const userId = localStorage.getItem('userId');
    return this.http.get<UserModel>(`${this.apiUrl}/${userId}`).pipe(
      map(user => user.totalAmount || 0)
    );
  }


  getCartItems(): Observable<CartItem[]> {
    const userId = this.getCurrentUserId();
    return this.http.get<UserModel>(`${this.apiUrl}/${userId}`).pipe(
      map(user => user.cart || [])
    );
  }

addToCart(item: CartItem): Observable<CartItem[]> {
  const userId = this.getCurrentUserId();
  return this.http.get<UserModel>(`${this.apiUrl}/${userId}`).pipe(
    switchMap(user => {
      const currentCart = user.cart || [];

      // Check if cart is empty or if restaurantId matches
      if (
        currentCart.length === 0 ||
        currentCart[0].restaurantId === item.restaurantId
      ) {
        const updatedCart = [...currentCart, item];
        const totalAmount = this.calculateTotal(updatedCart);
        return this.http.patch<UserModel>(`${this.apiUrl}/${userId}`, {
          cart: updatedCart,
          totalAmount
        });
      } else {
        // Reject addition from different restaurant
        throw new Error(
          'You can only add items from one restaurant at a time. Please clear your cart to add items from another restaurant.'
        );
      }
    }),
    map(user => user.cart)
  );
}


  updateCartItem(item: CartItem): Observable<CartItem[]> {
    const userId = this.getCurrentUserId();
    return this.http.get<UserModel>(`${this.apiUrl}/${userId}`).pipe(
      switchMap(user => {
        const updatedCart = (user.cart || []).map(cartItem =>
          cartItem.id === item.id ? item : cartItem
        );
        const totalAmount = this.calculateTotal(updatedCart);
        return this.http.patch<UserModel>(`${this.apiUrl}/${userId}`, { cart: updatedCart, totalAmount });
      }),
      map(user => user.cart)
    );
  }

  removeFromCart(id: string): Observable<CartItem[]> {
    const userId = this.getCurrentUserId();
    return this.http.get<UserModel>(`${this.apiUrl}/${userId}`).pipe(
      switchMap(user => {
        const updatedCart = (user.cart || []).filter(item => item.id !== id);
        const totalAmount = this.calculateTotal(updatedCart);
        return this.http.patch<UserModel>(`${this.apiUrl}/${userId}`, { cart: updatedCart, totalAmount });
      }),
      map(user => user.cart)
    );
  }

  emptyCart(): Observable<CartItem[]> {
    const userId = this.getCurrentUserId();
    return this.http.patch<UserModel>(`${this.apiUrl}/${userId}`, { cart: [], totalAmount: 0 }).pipe(
      map(user => user.cart)
    );
  }
}
