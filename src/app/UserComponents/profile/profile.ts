import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../Models/users';
import { UserService } from '../../Services/user-service';
import { Router } from '@angular/router';
import { ProfileEditComponent } from '../profile-edit-component/profile-edit-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ProfileEditComponent, CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class UserProfileComponent implements OnInit {
  user: UserModel | null = null;
  showEditForm: boolean = false;
  userId: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.loadUserData();
    } else {
      alert('User not logged in.');
      this.router.navigate(['/login-page']);
    }
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId!).subscribe(data => {
      this.user = data;
    });
  }

  toggleEditMode(): void {
    this.showEditForm = !this.showEditForm;
  }

  onFormSubmit(success: boolean): void {
    if (success) {
     this.loadUserData();
    }
    this.showEditForm = false;
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('userId');
      this.router.navigate(['/home-page']);
    }
  }
}
