import { CartItem } from './cart-item';
import { OrdersModel } from './orders-model';
import { UserProfile } from './user-profile';

export interface UserModel {
  id: string;
  email: string;
  password: string;
  profile: UserProfile;
  orders: OrdersModel[];
  cart: CartItem[];
  totalAmount: number;
}


