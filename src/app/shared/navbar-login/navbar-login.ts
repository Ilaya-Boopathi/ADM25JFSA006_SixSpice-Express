import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar-login',
  standalone: true,
  imports: [RouterModule,CommonModule],
  
  templateUrl: './navbar-login.html',
  styleUrl: './navbar-login.css'
})
export class NavbarLogin {
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

  goToHome(){
    this.router.navigate(['/home-page']);
  }
  goToSignUp(){
    this.router.navigate(['/signup-page']);
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
