import { Routes } from '@angular/router';
import { restaurantAuthGuardGuard } from './Services/restaurant-auth-guard-guard';
import { userAuthGuardGuard } from './Services/user-auth-guard-guard';
 
export const routes: Routes = [
  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: 'home-page', loadComponent: () => import('./Authentication/home/home').then(m => m.Home) },
  { path: 'login-page', loadComponent: () => import('./Authentication/login/login').then(m => m.Login) },
  { path: 'signup-page', loadComponent: () => import('./Authentication/signup/signup').then(m => m.Signup) },
  { path: 'forgot-password', loadComponent: () => import('./Authentication/forgot-password/forgot-password').then(m => m.ForgotPassword) },
  {
    path: 'dashboard-layout',
    canActivate: [restaurantAuthGuardGuard],
    loadComponent: () => import('./Components/dashboard-layout/dashboard-layout').then(m => m.DashboardLayout),
    children: [
      { path: '', redirectTo: 'dashboard-component', pathMatch: 'full' },
      { path: 'dashboard-component', loadComponent: () => import('./Components/dashboard-component/dashboard-component').then(m => m.DashboardComponent) },
      { path: 'orders-component', loadComponent: () => import('./Components/orders-component/orders-component').then(m => m.OrdersComponent) },
      { path: 'menu-component', loadComponent: () => import('./Components/menu-component/menu-component').then(m => m.MenuComponent) },
      { path: 'add-edit-menu-component', loadComponent: () => import('./Components/add-edit-menu-component/add-edit-menu-component').then(m => m.AddEditMenuComponent) },
      { path: 'delivery-agent-component', loadComponent: () => import('./Components/delivery-agent-component/delivery-agent-component').then(m => m.DeliveryAgentComponent) },
      { path: 'add-edit-deliveryagent-component', loadComponent: () => import('./Components/add-edit-deliveryagent-component/add-edit-deliveryagent-component').then(m => m.AddEditDeliveryAgentComponent) },
      { path: 'restaurant-profile-component', loadComponent: () => import('./Components/restaurant-profile-component/restaurant-profile-component').then(m => m.RestaurantProfileComponent) },
      { path: 'profile-edit-component', loadComponent: () => import('./Components/profile-edit-component/profile-edit-component').then(m => m.ProfileEditComponent)},
      {path : '**', loadComponent : () => import('./UserComponents/notfound/notfound').then(m => m.Notfound)}
    ]
  },
  {
    path:'menu-management',
    canActivate:[userAuthGuardGuard],
    loadComponent: () => import('./UserComponents/menu-management/menu-management').then(m => m.MenuManagement),
    children:[
      {path:'menu', loadComponent: () => import('./UserComponents/menu/menu').then(m => m.Menu) },
      {path:'restaurants-menu/:id', loadComponent: () => import('./UserComponents/foodpage/foodpage').then(m => m.Foodpage) },
      {path:'restaurantpage', loadComponent: () => import('./UserComponents/restaurantpage/restaurantpage').then(m => m.Restaurantpage) },
      {path:'profile', loadComponent: () => import('./UserComponents/profile/profile').then(m => m.UserProfileComponent) },
      {path:'cart', loadComponent: () => import('./UserComponents/cart/cart').then(m => m.Cart) },
      {path:'searchpage', loadComponent: () => import('./UserComponents/searchpage/searchpage').then(m => m.Searchpage) },
      {path: 'user-orders-component', loadComponent: () => import('./UserComponents/user-orders-component/user-orders-component').then(m => m.UserOrderComponent) },
      {path: 'profile-edit-component', loadComponent: () => import('./Components/profile-edit-component/profile-edit-component').then(m => m.ProfileEditComponent) },
      {path : '**', loadComponent : () => import('./UserComponents/notfound/notfound').then(m => m.Notfound) }
    ]
  },
  // Apply the user guard to the payment and tracking components.
  {path : 'payment-checkout', canActivate: [userAuthGuardGuard], loadComponent : () => import('./PaymentComponent/payment-checkout/payment-checkout').then(m => m.Checkout) },
  {path : 'payment-options', canActivate: [userAuthGuardGuard], loadComponent : () => import('./PaymentComponent/payment-options/payment-options').then(m => m.PaymentOptions) },
  {path : 'payment-summary', canActivate: [userAuthGuardGuard], loadComponent : () => import('./PaymentComponent/payment-summary/payment-summary').then(m => m.PaymentSummary) },
  {path : 'delivery-status/:orderId', canActivate: [userAuthGuardGuard], loadComponent: () => import('./TrackingComponents/tracking-page-component/tracking-page-component').then(m => m.TrackingPageComponent) },

  // Wildcard for unhandled routes.
  {path : '**', loadComponent : () => import('./UserComponents/notfound/notfound').then(m => m.Notfound)}
];