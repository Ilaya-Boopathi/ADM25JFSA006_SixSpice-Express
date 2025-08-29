import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import{ Router } from '@angular/router';
@Component({
  selector: 'app-navbar-signup',
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar-signup.html',
  styleUrl: './navbar-signup.css'
})
export class NavbarSignup {

  isMenuOpen: boolean = false;

  constructor(private router: Router) {}
  goToHome(){
    this.router.navigate(['/home-page']);
  }
  goToLogin(){
    this.router.navigate(['/login-page']);
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
