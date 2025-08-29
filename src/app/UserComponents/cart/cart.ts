import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../Models/cart-item';
import { Cartitems } from '../../services copy/cartitems';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: Cartitems, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  removeItem(id: string): void {
    this.cartService.removeFromCart(id).subscribe(updatedCart => {
      this.cartItems = updatedCart;
      this.calculateTotal();
    });
  }

  emptyCart(): void {
    this.cartService.emptyCart().subscribe(updatedCart => {
      this.cartItems = updatedCart;
      this.totalPrice = 0;
    });
  }

  getItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  calculateTotal(): void {
  this.cartService.getTotalAmount().subscribe(total => {
    this.totalPrice = total;
  });
}


  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.cartService.updateCartItem(item).subscribe(updatedCart => {
      this.cartItems = updatedCart;
      this.calculateTotal();
    });
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCartItem(item).subscribe(updatedCart => {
        this.cartItems = updatedCart;
        this.calculateTotal();
      });
    }
  }

  checkout(): void {
    this.router.navigate(['/payment-checkout']);
  }
}
