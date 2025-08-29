import { Component, OnInit } from '@angular/core';
import { MenuModel } from '../../Models/menu-model';
import { Restaurant } from '../../Models/restaurant';
import { Restaurantdata } from '../../services copy/restaurantdata';
import { Cartitems } from '../../services copy/cartitems';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searchpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './searchpage.html',
  styleUrl: './searchpage.css'
})
export class Searchpage implements OnInit {
  query: string = '';
  restaurants: Restaurant[] = [];
  matchedRestaurants: Restaurant[] = [];
  matchedFoods: { food: MenuModel; restaurantName: string; restaurantId: string }[] = [];
  addedItems: { [key: string]: boolean } = {};
  text: string = '';

  constructor(
    private restaurantService: Restaurantdata,
    private cartService: Cartitems,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.text = params['q'];
      this.query = params['q']?.toLowerCase() || '';
      this.performSearch();
    });

    this.syncCartState();
  }

  navigatetorestaurant(Restaurantid: string) {
    this.router.navigate(['menu-management/restaurants-menu', Restaurantid]);
  }

  private getItemKey(food: MenuModel, restaurantId: string): string {
    return `${restaurantId}_${food.id}`;
  }

  isItemAdded(item: { food: MenuModel; restaurantId: string }): boolean {
    return this.addedItems[this.getItemKey(item.food, item.restaurantId)];
  }

  syncCartState(): void {
    this.cartService.getCartItems().subscribe(cartItems => {
      cartItems.forEach(item => {
        const key = `${item.restaurantId}_${item.id}`;
        this.addedItems[key] = true;
      });
    });
  }

  addToCart(food: MenuModel, restaurantName: string, restaurantId: string): void {
    const key = this.getItemKey(food, restaurantId);
    if (this.addedItems[key]) return;

    const cart = {
      id: food.id,
      name: food.name,
      price: food.price,
      quantity: 1,
      restaurant: restaurantName,
      category: food.category,
      restaurantId: restaurantId,
      image: food.image   
    };

    this.cartService.addToCart(cart).subscribe(() => {
      this.addedItems[key] = true;
    });
  }

  performSearch(): void {
    this.restaurantService.getRestaurants().subscribe(restaurantData => {
      this.restaurants = restaurantData;
      const queryWords = this.query.toLowerCase().split(' ');

      // Match restaurants by overview or menu items
      this.matchedRestaurants = this.restaurants.filter(r => {
        const overviewMatch = queryWords.some(word =>
          r.overview?.restaurantName?.toLowerCase().includes(word) ||
          r.overview?.cuisine?.toLowerCase().includes(word) ||
          r.overview?.location?.toLowerCase().includes(word)
        );

        const menuMatch = r.menuItems?.some(food =>
          queryWords.some(word =>
            food.name?.toLowerCase().includes(word) ||
            food.category?.toLowerCase().includes(word)
          )
        );

        return overviewMatch || menuMatch;
      });

      // Match individual food items
      this.matchedFoods = [];
      this.restaurants.forEach(r => {
        r.menuItems?.forEach(food => {
          const name = food.name?.toLowerCase() || '';
          const category = food.category?.toLowerCase() || '';
          const matched = queryWords.some(word =>
            name.includes(word) || category.includes(word)
          );
          if (matched) {
            this.matchedFoods.push({
              food,
              restaurantName: r.overview?.restaurantName || 'Unknown',
              restaurantId: r.id
            });
          }
        });
      });
    });
  }
}
