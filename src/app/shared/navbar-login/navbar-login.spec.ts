import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarLogin } from './navbar-login';

describe('NavbarLogin', () => {
  let component: NavbarLogin;
  let fixture: ComponentFixture<NavbarLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLogin, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
