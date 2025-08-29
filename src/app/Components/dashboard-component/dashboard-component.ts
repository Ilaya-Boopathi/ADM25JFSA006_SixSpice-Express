import { Component, OnInit } from '@angular/core';
import { OrdersModel } from '../../Models/orders-model';
import { AgentsModel } from '../../Models/agents-model';
import { OverviewModel } from '../../Models/overview-model';
import { OrdersService } from '../../Services/orders-service';
import { AgentsService } from '../../Services/agents-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverviewService } from '../../Services/overview-service';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css'
})
export class DashboardComponent implements OnInit {
  recentOrders: OrdersModel[] = [];
  deliveryAgentStatus: AgentsModel[] = [];
  overviewData: Partial<OverviewModel> | null = null;

  constructor(
    private OrderService: OrdersService,
    private AgentService: AgentsService,
    private OverviewService: OverviewService
  ) {}

  ngOnInit(): void {
    // Step 1: Get overview data (for restaurant name)
    this.OverviewService.getData().subscribe((data: OverviewModel | null) => {
      this.overviewData = data;

      // Step 2: Get orders
      this.OrderService.getOrders().subscribe((orders: OrdersModel[]) => {
        const sortedOrders = orders.sort((a, b) => {
          if (a.status === 'Delivered' && b.status !== 'Delivered') return 1;
          if (b.status === 'Delivered' && a.status !== 'Delivered') return -1;
          return 0;
        });

        this.recentOrders = sortedOrders.slice(0, 5);

        // Step 3: Get agents
        this.AgentService.getAgents().subscribe((agents: AgentsModel[]) => {
        const availableAgents = agents.filter(agent => agent.status === 'Available');
        const deliveringAgents = agents.filter(agent => agent.status === 'Delivering');

        // ✅ Overview shows total available agents
        const availableCount = availableAgents.length;

        // ✅ Dashboard shows only 5 agents (prefer available, fill with delivering)
        const selectedAgents: AgentsModel[] = [];

        for (let i = 0; i < availableAgents.length && selectedAgents.length < 5; i++) {
          selectedAgents.push(availableAgents[i]);
        }

        for (let i = 0; i < deliveringAgents.length && selectedAgents.length < 5; i++) {
          selectedAgents.push(deliveringAgents[i]);
        }

        this.deliveryAgentStatus = selectedAgents;

        // ✅ Update overview with full available count
        const updatedOverview: Partial<OverviewModel> = {
        // restaurantName: data.restaurantName,
        // restaurantId: data.restaurantId,
        totalOrdersToday: orders.length,
        pendingOrders: orders.filter(order => order.status !== 'Delivered').length,
        deliveryPersonAvailable: availableCount, // ✅ Full count, not just 5
        totalRevenue: orders
          .filter(order => order.status === 'Delivered')
          .reduce((sum, order) => sum + (order.total || 0), 0)
        };


        this.overviewData = {
          ...this.overviewData,
            ...updatedOverview
          };
        this.OverviewService.updateData(this.overviewData).subscribe();
      });

      });
    });
  }
}

  
