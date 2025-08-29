import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-component.html',
  styleUrl: './nav-component.css'
})
export class NavComponent {

  isMenuOpen: boolean = false;
  constructor(private router: Router) {}

  changeAddress(): void {
    this.router.navigate(['/payment-checkout']);
  }

  goBack(): void {
    this.router.navigate(['menu-management/menu']);
  }
  goToProfile(): void {
    this.router.navigate(['/menu-management/profile']);
  }
  goToCart(): void {
    this.router.navigate(['/menu-management/checkout']);
  }

   toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
 
}
