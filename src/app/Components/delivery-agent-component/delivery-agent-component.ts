import { Component, OnInit } from '@angular/core';
import { AgentsService } from '../../Services/agents-service'; 
import { AgentsModel } from '../../Models/agents-model';
import { CommonModule } from '@angular/common';
import { AddEditDeliveryAgentComponent } from "../add-edit-deliveryagent-component/add-edit-deliveryagent-component";

@Component({
  selector: 'app-delivery-agent-component',
  imports: [CommonModule, AddEditDeliveryAgentComponent],
  templateUrl: './delivery-agent-component.html',
  styleUrls: ['./delivery-agent-component.css']
})
export class DeliveryAgentComponent implements OnInit {
  agents: AgentsModel[] = [];
  showForm: boolean = false;
  editAgent: AgentsModel | null = null;
  isEditMode: boolean = false;

  constructor(private agentsService: AgentsService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.agentsService.getAgents().subscribe((data) => {
      this.agents = data;
    });
  }

  onAddAgent(): void {
    this.editAgent = null;
    this.isEditMode = false;
    this.showForm = true;
  }

  onEditAgent(agent: AgentsModel): void {
    this.editAgent = agent;
    this.isEditMode = true;
    this.showForm = true;
  }

  onFormSubmit(success: boolean): void {
    if (success) {
      this.loadAgents();
    }
    this.showForm = false;
  }

  deleteAgent(id: string): void {
    if (confirm('Are you sure you want to delete this agent?')) {
      this.agentsService.deleteAgent(id).subscribe(() => {
        this.loadAgents();
      });
    }
  }
}
