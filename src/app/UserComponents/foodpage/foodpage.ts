import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Food } from '../../Models/food';
import { Restaurantdata } from '../../services copy/restaurantdata';
import { Cartitems } from '../../services copy/cartitems';
import { MenuModel } from '../../Models/menu-model';

@Component({
  selector: 'app-foodpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foodpage.html',
  styleUrls: ['./foodpage.css']
})
export class Foodpage implements OnInit {
  restaurantId: string = '';
  restaurantName: string = '';
  restaurantLocation: string = '';
  foods: MenuModel[] = [];
  addedItems: { [key: string]: boolean } = {};
  itemErrors: { [key: string]: boolean } = {};
  cartRestaurantId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: Restaurantdata,
    private cartService: Cartitems
  ) {}

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id')!;

    this.restaurantService.getRestaurants().subscribe(data => {
      const restaurant = data.find(r => r.id === this.restaurantId);
      if (restaurant) {
        this.restaurantName = restaurant.overview.restaurantName || 'Unknown Restaurant';
        this.restaurantLocation = restaurant.overview.location || 'Unknown Location';
        this.foods = restaurant.menuItems || [];
      }
      this.syncCartState();
    });
  }

  private getItemKey(food: Food): string {
    return `${this.restaurantId}_${food.id}`;
  }

  isItemAdded(food: Food): boolean {
    return this.addedItems[this.getItemKey(food)];
  }

  hasItemError(food: Food): boolean {
    return this.itemErrors[this.getItemKey(food)];
  }

  syncCartState(): void {
    this.cartService.getCartItems().subscribe(cartItems => {
      cartItems.forEach(item => {
        const key = `${item.restaurantId}_${item.id}`;
        this.addedItems[key] = true;
        this.cartRestaurantId = item.restaurantId;
      });
    });
  }

  addToCart(food: Food): void {
    const key = this.getItemKey(food);

    if (this.cartRestaurantId && this.cartRestaurantId !== this.restaurantId) {
      this.itemErrors[key] = true;
      setTimeout(() => {
        this.itemErrors[key] = false;
      }, 2000);
      return;
    }

    const cart = {
      id: food.id,
      name: food.name,
      price: food.price,
      quantity: 1,
      restaurant: this.restaurantName,
      restaurantId: this.restaurantId,
      image: food.image
      
    };

    this.cartService.addToCart(cart).subscribe({
      next: () => {
        this.addedItems[key] = true;
        this.itemErrors[key] = false;
        this.cartRestaurantId = this.restaurantId;
      },
      error: () => {
        this.itemErrors[key] = true;
        setTimeout(() => {
          this.itemErrors[key] = false;
        }, 2000);
      }
    });
  }
}
