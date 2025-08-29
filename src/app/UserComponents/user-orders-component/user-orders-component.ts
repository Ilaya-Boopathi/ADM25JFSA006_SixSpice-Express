// src/app/components/orders/orders.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-orders-component',
  imports: [CommonModule],
  templateUrl: './user-orders-component.html',
  styleUrls: ['./user-orders-component.css']
})
export class UserOrderComponent implements OnInit {
  orders: any[] = [];
  userId: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.userService.getOrdersByUserId(this.userId).subscribe(data => {
        this.orders = [...data].reverse(); 
      });
    }
  }

  trackOrder(orderId: string): void {
    // Redirect to track page (you'll implement this later)
    this.router.navigate(['/delivery-status', orderId]);
  }
}
