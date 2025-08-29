import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../PaymentServices/payment-service';
import { TransactionService } from '../../PaymentServices/transaction-service';
import { Router } from '@angular/router';
import { Footer } from '../../shared/footer/footer';
import { NavComponent } from '../nav-component/nav-component';
import { Transaction } from '../../Models/transaction';
import { Cartitems } from '../../services copy/cartitems';
 
@Component({
  selector: 'app-payment-options',
  standalone: true,
  imports: [CommonModule, FormsModule, NavComponent, Footer],
  templateUrl: './payment-options.html',
  styleUrl: './payment-options.css'
})
export class PaymentOptions implements OnInit {
  selectedOption = '';
  upiId = '';
  couponCode = '';
  cardDetails = { number: '', expiry: '', cvv: '' };
  paymentSuccess = false;
  loadingPayment = false;
 
  cardBrandLogo = '';
  cardPreviewNumber = '';
  errormsg = '';
  validmsg = '';
 
  deliveryCharge: number = 0;
  cartTotal: number = 0;
 
  constructor(
    public paymentService: PaymentService,
    private transactionService: TransactionService,
    private router: Router,
    private cartItemService: Cartitems
  ) {}
 
  ngOnInit(): void {
    this.paymentService.getDeliveryCharge().subscribe(charge => {
      this.deliveryCharge = charge;
    });
 
    this.paymentService.getCartTotal().subscribe(total => {
      this.cartTotal = total;
    });
  }
 
  applyCoupon(): void {
    this.errormsg = '';
    this.validmsg = '';
    this.paymentService.applyCoupon(this.couponCode.trim().toUpperCase());
 
    setTimeout(() => {
      const discount = this.paymentService.getDiscount();
      if (discount === 0) {
        this.errormsg = '❌ Invalid coupon or expired offer.';
      } else {
        this.validmsg = `Coupon applied successfully. You saved ₹${discount}.`;
        this.paymentService.getCartTotal().subscribe(total => {
          this.cartTotal = total;
        });
      }
    }, 300);
  }
 
  getDiscount(): number {
    return this.paymentService.getDiscount();
  }
 
  isValidUpiId(upiId: string): boolean {
    const regex = /^[\w.\-]{2,}@[a-zA-Z]{3,}$/;
    return regex.test(upiId.trim());
  }
 
  getUpiError(): string {
    if (!this.upiId.trim()) return '';
    return this.isValidUpiId(this.upiId)
      ? ''
      : 'Invalid UPI ID format. Use name@bank';
  }
 
  onCardInput(e: any): void {
    const raw = e.target.value.replace(/\D/g, '');
    this.cardDetails.number = raw.match(/.{1,4}/g)?.join(' ') || '';
    this.cardPreviewNumber = this.cardDetails.number;
    this.setCardBrandLogo(raw.substring(0, 6));
  }
 
  setCardBrandLogo(binPrefix: string): void {
    switch (true) {
      case binPrefix.startsWith('4'):
        this.cardBrandLogo = 'images/visa.svg';
        break;
      case binPrefix.startsWith('5'):
        this.cardBrandLogo = 'images/mastercard.svg';
        break;
      case binPrefix.startsWith('3'):
        this.cardBrandLogo = 'images/amex.svg';
        break;
      default:
        this.cardBrandLogo = 'images/card.svg';
    }
  }
 
  isValidExpiry(date: string): boolean {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(date)) return false;
 
    const [month, year] = date.split('/').map(Number);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100;
 
    return year > currentYear || (year === currentYear && month >= currentMonth);
  }
 
  payNow(): void {
  this.validmsg = '';
  this.errormsg = '';
  this.paymentService.setPaymentMethod(this.selectedOption);
  const cardType = this.paymentService.getCardType(this.cardDetails.number);
  this.paymentService.setCardType(cardType);
 
  const cardDigits = this.cardDetails.number.replace(/\s/g, '');
  const cvv = this.cardDetails.cvv;
  const expiry = this.cardDetails.expiry;
 
 
    if (this.selectedOption === 'Card') {
      const isKnownCardType = ['Visa', 'MasterCard', 'Amex'].includes(cardType);
      const isCardLengthValid = cardDigits.length >= 13 && cardDigits.length <= 19;
      const isCvvValid = /^[0-9]{3,4}$/.test(cvv);
      const isExpiryValid = this.isValidExpiry(expiry);
 
      if (!isKnownCardType) {
        this.errormsg = '❌ Unrecognized card type. Use Visa, MasterCard, or Amex.';
      } else if (!isCardLengthValid) {
        this.errormsg = '❌ Card number must be between 13 and 19 digits.';
      } else if (!isExpiryValid) {
        this.errormsg = '❌ Invalid expiry date.';
      } else if (!isCvvValid) {
        this.errormsg = '❌ CVV must be 3–4 digits.';
      }
 
      if (this.errormsg) {
        return;
      }
    }
 
    if (this.selectedOption === 'UPI' && !this.isValidUpiId(this.upiId)) {
      this.errormsg += 'Invalid UPI format. Use name@bank.';
      return;
    }
 
    if (!['Card', 'UPI', 'COD'].includes(this.selectedOption)) {
      this.errormsg += 'No valid payment method selected.';
      return;
    }
 
  this.loadingPayment = true;
 
  // ✅ First place the order
  this.transactionService.placeOrder().subscribe({
  next: (orderId: string) => {
    this.paymentService.setOrderId(orderId); // ✅ Use correct orderId
 
    this.paymentService.getTransactionSummary().subscribe((transaction: Transaction) => {
      transaction.orderId = orderId; // ✅ Attach correct orderId to transaction
 
      this.transactionService.saveTransaction(transaction).subscribe({
        next: () => {
          this.cartItemService.emptyCart().subscribe({
            next: () => {
              this.paymentSuccess = true;
              setTimeout(() => {
                this.router.navigate(['/payment-summary'], {
                  state: { data: transaction },
                });
              }, 1200);
            },
            error: (err) => {
              console.error('Failed to empty cart:', err);
            }
          });
        },
        error: (err) => {
          this.loadingPayment = false;
          this.errormsg = '❌ Failed to save transaction. Please try again.';
          console.error('Transaction save error:', err);
        }
      });
    });
  },
  error: (err) => {
    this.loadingPayment = false;
    this.errormsg = '❌ Failed to place order. Please try again.';
    console.error('Order placement error:', err);
  }
});
  }
 
}