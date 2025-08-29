import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavPsummary } from './nav-psummary';

describe('NavPsummary', () => {
  let component: NavPsummary;
  let fixture: ComponentFixture<NavPsummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavPsummary, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavPsummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
