import { Component } from '@angular/core';
import { MenuModel } from '../../Models/menu-model';
import { MenuService } from '../../Services/menu-service';
import { CommonModule } from '@angular/common';
import { AddEditMenuComponent } from '../add-edit-menu-component/add-edit-menu-component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-component',
  imports: [CommonModule, AddEditMenuComponent, FormsModule],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css'
})
export class MenuComponent {
  menuItems: MenuModel[] = [];
  selectedItem: MenuModel | null = null;
  showForm: boolean = false;
  isEditMode: boolean = false;

  constructor(private menuService: MenuService){}

  ngOnInit(): void {
   this.loadMenuItems();
  }

  loadMenuItems(): void {
     this.menuService.getMenuItems().subscribe(data => {
      this.menuItems = data;
    });
  }

  openAddForm(): void {
    this.selectedItem = null;
    this.isEditMode = false;
    this.showForm = true;
  }

  editItem(item: MenuModel): void {
    this.selectedItem = { ...item };
    this.isEditMode = true;
    this.showForm = true;
  }

  removeItem(id: string): void {
    if(confirm("Are you sure you want to remove this item?")){
      this.menuService.deleteMenuItem(id).subscribe(() => {
        this.loadMenuItems();
      });
    }
  }

  onFormSubmit(updated: boolean): void {
    if(updated){
      console.log("data loaded");
      
      this.loadMenuItems();
    }
    this.showForm = false;
  }

    toggleAvailability(item: MenuModel) {
      this.menuService.updateMenuItem(item.id, {
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        available: item.available,
        restaurantId: item.restaurantId,
        image: item.image
      }).subscribe({
        next: () => {
          console.log(`Availability updated for ${item.name}`);
        },
        error: () => {
          item.available = !item.available; // rollback
          console.error(`Failed to update availability for ${item.name}`);
        }
      });
    }


}
