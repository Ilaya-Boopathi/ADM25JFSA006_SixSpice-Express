import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddEditDeliveryAgentComponent } from './add-edit-deliveryagent-component';

describe('AddEditDeliveryagentComponent', () => {
  let component: AddEditDeliveryAgentComponent;
  let fixture: ComponentFixture<AddEditDeliveryAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDeliveryAgentComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDeliveryAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
