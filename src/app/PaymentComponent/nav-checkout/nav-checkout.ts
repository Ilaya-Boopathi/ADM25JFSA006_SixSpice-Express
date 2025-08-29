import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-checkout',
  imports: [CommonModule],
  templateUrl: './nav-checkout.html',
  styleUrl: './nav-checkout.css'
})
export class NavCheckout {
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}
  goBack(): void {
    this.router.navigate(['menu-management/menu']);
  }
  goToCart(): void {
    this.router.navigate(['/menu-management/cart']);
  }
  goToProfile(): void {
    this.router.navigate(['/menu-management/profile']);

  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
