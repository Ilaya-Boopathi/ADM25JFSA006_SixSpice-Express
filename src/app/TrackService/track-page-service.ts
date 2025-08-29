import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { AgentsService } from '../Services/agents-service';

@Injectable({
  providedIn: 'root'
})
export class TrackPageService {
  private restaurantUrl = 'http://localhost:3000/restaurants';
  private userUrl = 'http://localhost:3000/users';
  deliveryAgents: any;

  constructor(private http: HttpClient, private agentService: AgentsService) {}

  getOrderDetails(orderId: string): Observable<any> {
  return new Observable(observer => {
    this.http.get<any[]>(this.restaurantUrl).subscribe(restaurants => {
      for (let rest of restaurants) {
        const order = rest.orders.find((o: any) => o.orderId === orderId);
        if (order) {
          order.restaurant = order.restaurant || rest.overview.restaurantName;

        
          const agent = this.deliveryAgents?.find((a: any) => a.name === order.assignedAgent);
          if (agent) {
            order.deliveryAgentName = agent.name;
            order.deliveryAgentPhone = agent.phone;
          }

          observer.next(order);
          observer.complete();
          return;
        }
      }

      this.http.get<any[]>(this.userUrl).subscribe(users => {
        for (let user of users) {
          const order = user.orders.find((o: any) => o.orderId === orderId);
          if (order) {
            order.restaurant = order.restaurant || 'N/A';

            // Attach agent details if available
            const agent = this.deliveryAgents?.find((a: any) => a.name === order.deliveryAgentName);
            if (agent) {
              order.deliveryAgentName = agent.name;
              order.deliveryAgentPhone = agent.phone;
            }

            observer.next(order);
            observer.complete();
            return;
          }
        }
        observer.error('Order not found');
      });
    });
  });
}



  startTracking(orderId: string, currentStatus: string, updateStatus: (status: string) => void): void {
  const statusTimeline = [
    { time: 0, status: 'Pending' },
    { time: 10000, status: 'Order Placed' },
    { time: 20000, status: 'Preparing' },
    { time: 30000, status: 'AwaitAgent' },
    { time: 40000, status: 'Delivered' }

  ];
  if (currentStatus === 'Delivered') {
    updateStatus('Delivered');
    return;
  }

  const currentIndex = statusTimeline.findIndex(stage => stage.status === currentStatus);

  for (let i = currentIndex + 1; i < statusTimeline.length; i++) {
    const next = statusTimeline[i];
    const delay = next.time - statusTimeline[currentIndex].time;
    setTimeout(() => {
      if (next.status === 'AwaitAgent') {
        this.http.get<any[]>(this.restaurantUrl).subscribe(restaurants => {
          const found = restaurants.flatMap(r => r.orders || []).find(o => o.orderId === orderId);
          const statusToApply = found?.assignedAgent ? 'Out for Delivery' : 'Preparing';
          updateStatus(statusToApply);
          this.updateStatusInBoth(orderId, statusToApply);
        });
      } else {
        updateStatus(next.status);
        this.updateStatusInBoth(orderId, next.status);
      }
    }, delay);
  }
}



private updateStatusInBoth(orderId: string, status: string): void {
  this.http.get<any[]>(this.restaurantUrl).subscribe(restaurants => {
    for (let rest of restaurants) {
      const orderIndex = rest.orders.findIndex((o: any) => o.orderId === orderId);
      if (orderIndex !== -1) {
        const order = rest.orders[orderIndex];
        if (status === 'Out for Delivery' && !order.assignedAgent) {
          order.status = 'Preparing';
        } else {
          order.status = status;
        }


        if (status === 'Delivered' && order.assignedAgent) {
          this.agentService.getAgents().subscribe(agents => {
            const agent = agents.find(a => a.name === order.assignedAgent);
            if (agent) {
              agent.status = 'Available';
              agent.badge = 'success';
              this.agentService.updateAgent(agent.id, agent).subscribe();
            }
          });
        }

        this.http.put(`${this.restaurantUrl}/${rest.id}`, rest).subscribe();
        break;
      }
    }
  });


  this.http.get<any[]>(this.userUrl).subscribe(users => {
    for (let user of users) {
      const orderIndex = user.orders.findIndex((o: any) => o.orderId === orderId);
      if (orderIndex !== -1) {
        const userOrder = user.orders[orderIndex];
        if (status === 'Out for Delivery' && !userOrder.deliveryAgentName && !userOrder.assignedAgent) {
          userOrder.status = 'Preparing';
        } else {
          userOrder.status = status;
        }
        this.http.put(`${this.userUrl}/${user.id}`, user).subscribe();
        break;
      }
    }
  });
}


}
