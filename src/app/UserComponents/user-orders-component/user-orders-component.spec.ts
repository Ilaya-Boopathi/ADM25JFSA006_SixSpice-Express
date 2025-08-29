import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserOrderComponent } from './user-orders-component';

describe('UserOrderComponent', () => {
  let component: UserOrderComponent;
  let fixture: ComponentFixture<UserOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOrderComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
