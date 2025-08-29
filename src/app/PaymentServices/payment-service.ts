import { Injectable } from '@angular/core';
import { CheckoutService } from './checkout-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Transaction } from '../Models/transaction';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private deliveryCharge = 50;
  private discount = 0;
  private coupon = '';
  private selectedMethod = '';
  private cardType = '';
  private transactionId = '';
  private orderId = '';

  constructor(private checkoutService: CheckoutService) {}

  getDeliveryCharge(): Observable<number> {
    return this.checkoutService.getTotal().pipe(
      map(total => (total >= 200 || total === 0 ? 0 : 50))
    );
  }

  getTotal(): Observable<number> {
    return this.checkoutService.getTotal();
  }

  getCartTotal(): Observable<number> {
    return combineLatest([
      this.checkoutService.getTotal(),
      this.getDeliveryCharge()
    ]).pipe(
      map(([total, delivery]) => total + delivery - this.discount)
    );
  }

  applyCoupon(code: string): void {
    this.checkoutService.getTotal().subscribe(total => {
      const couponRules: { [code: string]: { discount: number; minTotal: number } } = {
        'SPICY100': { discount: 100, minTotal: 500 },
        'WELCOME25': { discount: 25, minTotal: 0 },
        'FOOD10':    { discount: 10, minTotal: 250 },
        'BIGSAVE75': { discount: 75, minTotal: 400 }
      };

      const rule = couponRules[code];
      if (rule && total >= rule.minTotal) {
        this.discount = rule.discount;
        this.coupon = code;
      } else {
        this.discount = 0;
        this.coupon = '';
      }
    });
  }

  getCoupon(): string {
    return this.coupon;
  }

  getDiscount(): number {
    return this.discount;
  }

  
  setOrderId(id: string): void {
    this.orderId = id;
  }


  setPaymentMethod(method: string): void {
    this.selectedMethod = method;
  }

  getPaymentMethod(): string {
    return this.selectedMethod;
  }

  setCardType(type: string): void {
    this.cardType = type;
  }

  getCardType(number: string): string {
    const raw = number.replace(/\s/g, '');
    if (/^4/.test(raw)) return 'Visa';
    if (/^5[1-5]/.test(raw)) return 'MasterCard';
    if (/^3[47]/.test(raw)) return 'Amex';
    return 'Unknown';
  }

  getTransactionSummary(): Observable<Transaction> {
    const transactionId = 'TXN-' + Date.now();
    const method = this.selectedMethod;
    const cardType = this.cardType;
    const coupon = this.coupon;
    const id = Math.random().toString(36).substring(2, 6);

    return this.getCartTotal().pipe(
      map(amount => ({
        id,
        transactionId,
        method,
        cardType,
        coupon,
        amount,
        orderId : this.orderId
      }))
    );
  }

  
}
