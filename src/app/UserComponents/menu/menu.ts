import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Foodscroll } from '../foodscroll/foodscroll';
import { Restaurantscroll } from '../restaurantscroll/restaurantscroll';
import { Restaurantdata } from '../../services copy/restaurantdata';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Restaurant } from '../../Models/restaurant';


@Component({
  selector: 'app-menu',
  imports: [CommonModule, Foodscroll, FormsModule, Restaurantscroll],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit{

  RestaurantData : Restaurant[]=[];
constructor(private restaurantService : Restaurantdata,private router: Router){}
  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((response) => {
      this.RestaurantData = response;
    })
  }
  navigatetorestaurant(Restaurantid: string){
    this.router.navigate(['menu-management/restaurants-menu',Restaurantid]);
  }
}
