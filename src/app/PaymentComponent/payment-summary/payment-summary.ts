import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// import { NavCheckout } from '../nav-checkout/nav-checkout';
import { Footer } from '../../shared/footer/footer';
import { NavPsummary } from '../nav-psummary/nav-psummary';
import { Transaction } from '../../Models/transaction';
 
@Component({
  selector: 'app-payment-summary',
  standalone: true,
  imports: [FormsModule, CommonModule, NavPsummary, Footer],
  templateUrl: './payment-summary.html',
  styleUrl: './payment-summary.css'
})
export class PaymentSummary implements OnInit{
  transaction: Transaction;
 
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.transaction = nav?.extras?.state?.['data'];
  }
 
  ngOnInit(): void { }
 
  trackOrder(orderId: string): void {
    console.log(orderId);
    this.router.navigate(['/delivery-status', orderId]);
  }

 
}