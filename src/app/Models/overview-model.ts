export interface OverviewModel {
  restaurantId: string;
  restaurantName: string;
  image: string;
  logo: string;
  address: string;
  location: string,
  contact: string;
  email: string;
  hours: string;
  cuisine: string;
  owner: string;
  gst: string;
  established: string;
  totalOrdersToday: number;
  pendingOrders: number;
  deliveryPersonAvailable: number;
  totalRevenue: number;
}
