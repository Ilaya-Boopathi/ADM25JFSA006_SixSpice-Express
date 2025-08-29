import { Component } from '@angular/core';
import { OrdersModel } from '../../Models/orders-model';
import { AgentsModel } from '../../Models/agents-model';
import { OrdersService } from '../../Services/orders-service';
import { AgentsService } from '../../Services/agents-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-orders-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders-component.html',
  styleUrl: './orders-component.css'
})
export class OrdersComponent {
  orders: OrdersModel[] = [];
  deliveryAgents: AgentsModel[] = [];
 
  constructor(private orderService: OrdersService, private agentService: AgentsService){}
 
  ngOnInit(): void {
    this.loadData();
  }
 
  loadData(): void {
  this.orderService.getOrders().subscribe(data => {
    this.orders = data.sort((a, b) => {
      if (a.status === 'Delivered' && b.status !== 'Delivered') return 1;
      if (b.status === 'Delivered' && a.status !== 'Delivered') return -1;
      return 0;
    });
  });
 
  this.agentService.getAgents().subscribe(data => {
    this.deliveryAgents = Array.isArray(data)
      ? data.filter(agent => agent.status === 'Available' || this.orders.some(order => order.assignedAgent === agent.name))
      : [];
  });
}
 
 
    assignAgent(order: OrdersModel, event: Event) {
  const selectedAgent = (event.target as HTMLSelectElement).value;
  order.assignedAgent = selectedAgent;
  // order.status = 'Out for Delivery';
 
  const agent = this.deliveryAgents.find(a => a.name === selectedAgent);
  if (agent) {
    agent.status = 'Delivering';
    agent.badge = 'secondary';
 
    this.agentService.updateAgent(agent.id, agent).subscribe(() => {
      this.orderService.updateOrder(order.orderId, order).subscribe(() => {
        this.loadData();
      });
    });
  }
}
 
 
 
updateStatus(order: OrdersModel, newStatus: string) {
  order.status = newStatus;
 
  const agent = this.deliveryAgents.find((a: AgentsModel) => a.name === order.assignedAgent);
  if (agent) {
    // Attach agent info to order
    order.assignedAgent = agent.name;
    // order.deliveryAgentPhone = agent.phone;
 
    // If delivered, mark agent as available
    if (newStatus === 'Delivered') {
      agent.status = 'Available';
      agent.badge = 'success';
 
      this.agentService.updateAgent(agent.id, agent).subscribe(() => {
        this.syncOrderUpdate(order);
      });
    } else {
      this.syncOrderUpdate(order);
    }
  } else {
    this.syncOrderUpdate(order);
  }
}
 
// ✅ Helper method to sync both restaurant and user orders
private syncOrderUpdate(order: OrdersModel) {
  this.orderService.updateOrder(order.orderId, order).subscribe(() => {
    if (order.userId) {
      this.orderService.updateUserOrder(order.userId, order.orderId, order).subscribe(() => {
        this.loadData();
      });
    } else {
      this.loadData();
    }
  });
}
 
 
 
 
 
getAvailableAgents(): AgentsModel[] {
  return this.deliveryAgents.filter(agent => agent.status === 'Available');
}
 
getAgentsForOrder(order: OrdersModel): AgentsModel[] {
  return this.deliveryAgents.filter(agent =>
    agent.status === 'Available' || agent.name === order.assignedAgent
  );
}
 
isAssignedAgentRemoved(order: OrdersModel): boolean {
  return !!order.assignedAgent && !this.deliveryAgents.some(agent => agent.name === order.assignedAgent);
}
 
 
 
}
 