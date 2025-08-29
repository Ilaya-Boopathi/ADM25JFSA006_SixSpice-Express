import { Component, OnInit } from '@angular/core';
import { OverviewModel } from '../../Models/overview-model';
import { ProfileService } from '../../Services/profile-service';
import { CommonModule } from '@angular/common';
import { ProfileEditComponent } from '../profile-edit-component/profile-edit-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-profile',
  imports: [CommonModule, ProfileEditComponent],
  templateUrl: './restaurant-profile-component.html',
  styleUrls: ['./restaurant-profile-component.css']
})
export class RestaurantProfileComponent implements OnInit {
  restaurant: OverviewModel | null = null;
  showEditForm: boolean = false;

  constructor(private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.loadProfileData();
  }

  loadProfileData(): void {
    this.profileService.getRestaurantData().subscribe((data) => {
      this.restaurant = data;
    });
  }

  toggleEditMode(): void {
    this.showEditForm = !this.showEditForm;
  }

  onFormSubmit(success: boolean): void {
    if (success) {
      this.loadProfileData();
    }
    this.showEditForm = false;
  }

  logout(): void {
  if (confirm('Are you sure you want to logout?')) {
    // Clear session data
    localStorage.removeItem('restaurantId');
    localStorage.clear();
    this.router.navigate(['/home-page']);
  }
}

}