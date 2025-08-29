import { Injectable } from '@angular/core';
import { Cartitems } from '../services copy/cartitems';
import { Observable } from 'rxjs';
import { CartItem } from '../Models/cart-item';
 
export interface Address {
  name : string;
  line1: string;
  line2: string;
  city: string;
  pincode: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private CartItems: Cartitems){}

  private address: Address = {
    name: '',
    line1: '',
    line2: '',
    city: '',
    pincode: ''
  };
 
  private cartItems: CartItem[] = [];
 
  setAddress(address: Address): void {
    this.address = address;
  }
 
  getAddress(): Address {
    return this.address;
  }
 
  
 
  getCartItems(): Observable<CartItem[]> {
    console.log("Cart items getted");
    return this.CartItems.getCartItems();
  }
 
  getTotal(): Observable<number> {
    return this.CartItems.getTotalAmount();
  }
 
  clearCheckout(): void {
    this.cartItems = [];
    this.address = {
      name: '',
      line1: '',
      line2: '',
      city: '',
      pincode: ''
    };
  }

  
}