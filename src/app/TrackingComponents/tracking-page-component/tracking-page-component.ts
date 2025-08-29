import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackPageService } from '../../TrackService/track-page-service';
import { CommonModule } from '@angular/common';
import { Footer } from "../../shared/footer/footer";
import { NavCheckout } from "../../PaymentComponent/nav-checkout/nav-checkout";
import { Navbar } from "../../shared/navbar/navbar";
import { NavPsummary } from "../../PaymentComponent/nav-psummary/nav-psummary";

@Component({
  selector: 'app-tracking-page',
  templateUrl: './tracking-page-component.html',
  imports: [CommonModule, Footer, NavPsummary],
  styleUrls: ['./tracking-page-component.css']
})
export class TrackingPageComponent implements OnInit {
  orderId!: string;
  orderDetails: any;
  currentStatus: string = 'Pending';
  notFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private trackingService: TrackPageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('orderId');
      if (id) {
        this.orderId = id;
        this.trackingService.getOrderDetails(this.orderId).subscribe({
          next: (order) => {
            this.orderDetails = order;
            this.currentStatus = order.status || 'Pending';
            this.trackingService.startTracking(this.orderId, this.currentStatus, (status) => {
              this.currentStatus = status;
            });

          },
          error: () => {
            this.notFound = true;
          }
        });
      } else {
        this.notFound = true;
      }
    });
  }
}
