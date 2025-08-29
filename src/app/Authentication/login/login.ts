import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Auth } from '../../Services/auth';
import { NavbarLogin } from '../../shared/navbar-login/navbar-login';
import { Footer } from '../../shared/footer/footer';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, NavbarLogin, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  activeTab: 'user' | 'restaurant' = 'user';
  userLoginForm: FormGroup;
  restaurantLoginForm: FormGroup;
  loginMessage : string = '';
 
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private auth: Auth, private router:Router) {
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
 
    this.restaurantLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
 
    this.route.queryParams.subscribe((params: { tab?: string }) => {
      if (params['tab'] === 'restaurant') {
        this.activeTab = 'restaurant';
      }
    });
  }
 
onUserLogin() {
    if (this.userLoginForm.valid) {
      const { email, password } = this.userLoginForm.value;
 
      this.auth.getUsers().subscribe(users => {
        const user = users.find((u: any) => u.email === email && u.password === password);
 
        if (user) {
          this.loginMessage = 'Login Successful!';
          localStorage.setItem('userId', user.id);
          this.userLoginForm.reset();
          setTimeout(() => {
            this.loginMessage = '';
            this.router.navigate(['/menu-management/menu']);
          }, 1000);
        } else {
          this.userLoginForm.get('password')?.setErrors({ invalid: true });
        }
      });
    } else {
      this.userLoginForm.markAllAsTouched();
    }
  }
 
 
 
  onRestaurantLogin() {
    if (this.restaurantLoginForm.valid) {
      const { email, password } = this.restaurantLoginForm.value;
 
      this.auth.getRestaurants().subscribe(restaurants => {
        const restaurant = restaurants.find((r: any) => r.credentials?.email === email && r.credentials?.password === password);
 
        if (restaurant) {
          this.loginMessage = 'Login Successful!';
          localStorage.setItem('restaurantId', restaurant.id);
          this.restaurantLoginForm.reset();
          setTimeout(() => {
            this.loginMessage = '';
            this.router.navigate(['/dashboard-layout']);
          }, 1000);
        } else {
          this.restaurantLoginForm.get('password')?.setErrors({ invalid: true });
        }
      });
    } else {
      this.restaurantLoginForm.markAllAsTouched();
    }
  }
 
 
}
 