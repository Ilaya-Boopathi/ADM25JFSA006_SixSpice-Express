import { OverviewModel } from './overview-model';
import { MenuModel } from './menu-model';

export interface Restaurant {
  id: string;
  credentials: {
    email: string;
    password: string;
  };
  overview: OverviewModel;
  menuItems: MenuModel[];
}
