import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarSignup } from './navbar-signup';

describe('NavbarSignup', () => {
  let component: NavbarSignup;
  let fixture: ComponentFixture<NavbarSignup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSignup, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarSignup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
