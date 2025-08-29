import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Restaurant } from '../../Models/restaurant';
import { Restaurantdata } from '../../services copy/restaurantdata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurantscroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurantscroll.html',
  styleUrls: ['./restaurantscroll.css']
})  
export class Restaurantscroll implements OnInit {
  @ViewChild('scrollBox', { static: false }) scrollBox!: ElementRef;
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: Restaurantdata, private router: Router) {}

  ngOnInit(): void {
  const uniqueIds = new Set();
  this.restaurantService.getRestaurants().subscribe(data => {
    this.restaurants = data.filter(item => {
      if (uniqueIds.has(item.id)) {
        return false;
      } else {
        uniqueIds.add(item.id);
        return true;
      }
    });
  });
}


  scrollLeft() {
    this.scrollBox.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollBox.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
  }

  navigatetorestaurantmenu(restaurantId: string) {
    this.router.navigate(['menu-management/restaurants-menu', restaurantId]);
  }
}
