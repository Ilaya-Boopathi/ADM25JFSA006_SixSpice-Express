import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../Models/restaurant';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurantdata } from '../../services copy/restaurantdata';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurantpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurantpage.html',
  styleUrls: ['./restaurantpage.css']
})
export class Restaurantpage implements OnInit {
  filterRestaurants: Restaurant[] = [];
  dishName: string = '';
  restaurant: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: Restaurantdata
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.restaurant = params['q']
      this.dishName = params['q']?.toLowerCase() || '';
      this.perform();
    });
  }

  perform(): void {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.filterRestaurants = restaurants.filter(r =>
        r.menuItems.some(item => item.name.toLowerCase() === this.dishName)
      );
    });
  }

  navigatetorestaurant(restaurantId: string) {
    this.router.navigate(['menu-management/restaurants-menu', restaurantId]);
  }
}
