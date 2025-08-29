import { CommonModule, Location } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core'; // 👈 Add AfterViewInit
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './navbar-menu.html',
  styleUrl: './navbar-menu.css'
})
// 👈 Implement the AfterViewInit interface
export class NavbarMenu implements AfterViewInit {
  searchText: string = '';
  showBackButton = false;

  @ViewChild('navbarToggler') navbarToggler!: ElementRef;

  constructor(private router: Router, private location: Location) { 
    // The constructor is now clean.
  }

  // 👈 This lifecycle hook is called after the view is initialized,
  // making this.navbarToggler available.
  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const navbarContent = document.getElementById('navbarContent');
      // The check for navbarToggler.nativeElement is a good practice to prevent errors
      // if for some reason the element is not found.
      if (navbarContent && navbarContent.classList.contains('show') && this.navbarToggler) {
        this.navbarToggler.nativeElement.click();
      }

      this.showBackButton = !event.urlAfterRedirects.includes('menu-management/menu');
    });
  }

  // ... (rest of your methods) ...
  search() {
    const query = this.searchText.trim();
    if (query) {
      this.router.navigate(['menu-management/searchpage'], { queryParams: { q: query } });
    }
    this.searchText = '';
  }

  goBack() {
    this.location.back();
  }

  logOut() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('userId');
      this.router.navigate(['/home-page']);
    }
  }
}