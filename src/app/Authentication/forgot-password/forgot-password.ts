import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../Services/auth';
import { RouterModule } from '@angular/router';
import { NavbarLogin } from '../../shared/navbar-login/navbar-login';
import { CommonModule } from '@angular/common';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, NavbarLogin, CommonModule, Footer]
})
export class ForgotPassword {
  forgotForm: FormGroup;
  activeTab: 'user' | 'restaurant' = 'user';

  constructor(private fb: FormBuilder, private auth: Auth) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    const email = this.forgotForm.value.email;
    if (this.activeTab === 'user') {
      // Call user forgot password logic
      this.auth.getUsers().subscribe(users => {
        const user = users.find((u: any) => u.email === email);
        if (user) {
          alert('Password reset link sent to your email.');
        } else {
          alert('User email not found.');
        }
      });
    } else {
      // Call restaurant forgot password logic
      this.auth.getRestaurants().subscribe(restaurants => {
        const restaurant = restaurants.find((r: any) => r.email === email);
        if (restaurant) {
          alert('Password reset link sent to your email.');
        } else {
          alert('Restaurant email not found.');
        }
      });
    }
    this.forgotForm.reset();
  }
}