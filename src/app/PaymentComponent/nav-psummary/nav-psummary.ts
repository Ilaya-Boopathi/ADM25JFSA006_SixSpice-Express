import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-psummary',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-psummary.html',
  styleUrl: './nav-psummary.css'
})
export class NavPsummary {
  isMenuOpen: boolean = false;

  constructor(private router: Router) {}

   toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
