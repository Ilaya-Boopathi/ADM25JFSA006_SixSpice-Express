import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cartitems } from '../../services copy/cartitems';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavCheckout } from '../nav-checkout/nav-checkout';
import { Footer } from '../../shared/footer/footer';
import { CheckoutService } from '../../PaymentServices/checkout-service';
import { CartItem } from '../../Models/cart-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule, NavCheckout, Footer],
  templateUrl: './payment-checkout.html',
  styleUrl: './payment-checkout.css'
})
export class Checkout implements OnInit {
  address = {
    name: '',
    line1: '',
    line2: '',
    city: '',
    pincode: ''
  };

  

  cards: CartItem[] = [];
  totalAmount: number = 0;

  constructor(
    private router: Router,
    private CheckOutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.CheckOutService.getCartItems().subscribe({
      next: (items) => {
        this.cards = items;
        console.log('Cart items stored in array:', this.cards);
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
      }
    });
    this.CheckOutService.getTotal().subscribe({
      next: (amount) => {
            this.totalAmount = amount;
          },
          error: (err) => {
            console.error('Error fetching total amount:', err);
          }
    })
  }

  // private getCurrentUserId(): string | null {
  //   return localStorage.getItem('userId');



  // }

  isAddressValid(): boolean {
  const { name, line1, line2, city, pincode } = this.address;

  // Basic checks for empty fields and pincode length
  return (
    name.trim() !== '' &&
    line1.trim() !== '' &&
    line2.trim() !== '' &&
    city.trim() !== '' &&
    pincode.trim().length === 6 &&
    /^[0-9]{6}$/.test(pincode) // Ensures pincode is numeric and 6 digits
  );
}






 proceedToPayment(): void {
  if (this.isAddressValid()) {
    this.router.navigate(['/payment-options']);
  } else {
    alert('Please fill in all delivery address fields correctly.');
  }
}


  getCartItems(): Observable<CartItem[]> {
    return this.CheckOutService.getCartItems();
  }

  // getCartTotal(): Observable<number> {
  //   return this.CheckOutService.getTotal();
  // }
}
