export interface Transaction {
  id: string;
  transactionId: string;
  method: string;
  cardType: string;
  coupon: string;
  amount: number;
  orderId: string;
}
