import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgentsService } from '../../Services/agents-service';
import { AgentsModel } from '../../Models/agents-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-deliveryagent-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-deliveryagent-component.html',
  styleUrls: ['./add-edit-deliveryagent-component.css']
})

export class AddEditDeliveryAgentComponent implements OnInit {
  @Input() agent: AgentsModel | null = null;
  @Input() isEditMode: boolean = false;
  @Output() formSubmit = new EventEmitter<boolean>();

  agentForm!: FormGroup;

  constructor(private fb: FormBuilder, private agentsService: AgentsService) {}

  ngOnInit(): void {
    this.agentForm = this.fb.group({
      name: [this.agent?.name || '', Validators.required],
      phone: [this.agent?.phoneNumber || '', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      status: [this.agent?.status || 'Available', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.agentForm.invalid) return;

    const formData = this.agentForm.value;
    const agentData: AgentsModel = { 
      name: formData.name,
      phoneNumber: formData.phone,
      status: formData.status,
      badge: formData.status === 'Available' ? 'success' : 'warning',
      id: this.agent?.id ?? Math.random().toString(36).substring(2, 6)
    };

    if (this.isEditMode && this.agent) {
      this.agentsService.updateAgent(agentData.id, agentData).subscribe(() => {
        this.formSubmit.emit(true);
      });
    } else {
      this.agentsService.addAgent(agentData).subscribe(() => {
        this.formSubmit.emit(true);
      });
    }
  }

  onCancel(): void {
    this.formSubmit.emit(false);
  }
}
