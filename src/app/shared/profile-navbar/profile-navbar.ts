import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile-navbar.html',
  styleUrl: './profile-navbar.css'
})
export class ProfileNavbar {

  menuOpen = false;

  constructor(private router: Router) {}
  goToLogOut(){
    this.router.navigate(['/home-page']);
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
