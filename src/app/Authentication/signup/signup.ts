import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../Services/auth';
import { NavbarSignup } from '../../shared/navbar-signup/navbar-signup';
import { Footer } from '../../shared/footer/footer';
import {MatSnackBarModule } from '@angular/material/snack-bar';

function emailEndsWithCom(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return value && !value.endsWith('.com') ? { mustEndWithCom: true } : null;
}

function emailContainsAt(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  return value && !value.includes('@') ? { mustContainAt: true } : null;
}

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  const errors: ValidationErrors = {};
  if (password?.length < 6) errors['passwordTooShort'] = true;
  if (confirmPassword?.length < 6) errors['confirmPasswordTooShort'] = true;
  if (password !== confirmPassword) errors['passwordsMismatch'] = true;

  return Object.keys(errors).length ? errors : null;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, NavbarSignup, Footer,MatSnackBarModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  activeTab: 'user' | 'restaurant' = 'user';
  signupForm: FormGroup;
  restaurantForm: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private auth: Auth, private router: Router) {
    
      this.signupForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
        email: ['', [Validators.required, Validators.email, emailContainsAt, emailEndsWithCom]],
        password: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*])[A-Za-z\\d!@#\\$%\\^&\\*]{6,}$')
          ]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: passwordMatchValidator });


        this.restaurantForm = this.fb.group({
          restaurantName: ['', Validators.required],
          address: ['', Validators.required],
          phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
          email: ['', [Validators.required, Validators.email, emailContainsAt, emailEndsWithCom]],
          password: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#\\$%\\^&\\*])[A-Za-z\\d!@#\\$%\\^&\\*]{6,}$')
          ]],
          confirmPassword: ['', Validators.required],
          location: ['', Validators.required],
          cuisine: ['', Validators.required],
          owner: ['', Validators.required],
          gst: ['', [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]]
        }, { validators: passwordMatchValidator });



    this.route.queryParams.subscribe((params: { tab?: string }) => {
      if (params['tab'] === 'restaurant') {
        this.activeTab = 'restaurant';
      }
    });
  }
  
  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      const email = formData.email;

      this.auth.getUsers().subscribe(users => {
        const exists = users.some((u: any) => u.email === email);
        if (exists) {
          this.successMessage = 'You already have an account.';
        } else {
          const newUser = {
            id: `user${(users.length + 1).toString().padStart(3, '0')}`,
            email: formData.email,
            password: formData.password,
            profile: {
              name: formData.name,
              phone: formData.phoneNumber,
              address: "" 
            },
            orders: [],
            cart: [],
            totalAmount: 0,
            transactions: []
          };

          this.auth.registerUser(newUser).subscribe(() => {
            this.successMessage = 'User signed up successfully!';
            this.signupForm.reset();

            setTimeout(() => {
              this.router.navigate(['/login-page']);
            }, 1500);
          });
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }



  onRestaurantSignup() {
  if (this.restaurantForm.valid) {
    const formData = this.restaurantForm.value;
    const email = formData.email;

    this.auth.getRestaurants().subscribe(restaurants => {
      const exists = restaurants.some((r: any) => r.credentials?.email === email);
      if (exists) {
        this.successMessage = 'You already have an account.';
      } else {
        const newRestaurant = {
          id: `rest${(restaurants.length + 1).toString().padStart(3, '0')}`,
          credentials: {
            email: formData.email,
            password: formData.password
          },
          overview: {
            restaurantName: formData.restaurantName,
            cuisine: formData.cuisine,
            contact: formData.phoneNumber,
            email: formData.email,
            address: formData.address,
            location : formData.location,
            hours: "",
            owner: formData.owner,
            gst: formData.gst,
            totalOrdersToday: 0,
            pendingOrders: 0,
            deliveryPersonAvailable: 0,
            totalRevenue: 0
          },
          menuItems: [],
          deliveryAgents: [],
          orders: []
        };

        this.auth.registerRestaurant(newRestaurant).subscribe(() => {
          this.successMessage = 'Restaurant signed up successfully!';
          this.restaurantForm.reset();

          setTimeout(() => {
            this.router.navigate(['/login-page'], { queryParams: { tab: 'restaurant' } });
          }, 1500);
        });
      }
    });
  } else {
    this.restaurantForm.markAllAsTouched();
  }
}


}
