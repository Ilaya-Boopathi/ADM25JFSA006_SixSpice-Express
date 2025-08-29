import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-navbar',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './menu-navbar.html',
  styleUrl: './menu-navbar.css'
})
export class MenuNavbar {
  menuOpen = false;

  constructor(private router: Router) {}
  //goToCart(){
    //this.router.navigate(['/cart']);
  //}
  goToProfile(){
    this.router.navigate(['/profile']);
  }
  goToLogOut(){
    this.router.navigate(['/home-page']);
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
