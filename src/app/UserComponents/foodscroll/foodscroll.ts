import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Food } from '../../Models/food';
import { Fooddata } from '../../services copy/fooddata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foodscroll',
  imports: [CommonModule],
  templateUrl: './foodscroll.html',
  styleUrl: './foodscroll.css'
})
export class Foodscroll implements OnInit{
  @ViewChild('scrollBox') scrollBox!:ElementRef;
  foodItems : Food[]=[];
  searchText :string ="";
  constructor(private foodService:Fooddata,private router:Router){}

  ngOnInit(): void {
  this.foodService.getFoods().subscribe(data => {
    const uniqueIds = new Set();
    this.foodItems = data.filter(item => {
      if (uniqueIds.has(item.name)) {
        return false;
      } else {
        uniqueIds.add(item.name);
        return true;
      }
    });
  });
}

  
scrollLeft() {
    this.scrollBox.nativeElement.scrollBy({ left: -150, behavior: 'smooth' });
  }

  scrollRight() {
    this.scrollBox.nativeElement.scrollBy({ left: 150, behavior: 'smooth' });
  }

  navigatetorestaurant(dishName : string) {
    this.searchText = dishName;
    const query = this.searchText.trim()
    if(query) {
      this.router.navigate(['menu-management/restaurantpage'],{queryParams:{q:query}});
    }
  }

}
