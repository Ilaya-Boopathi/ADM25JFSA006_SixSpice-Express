import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuNavbar } from './menu-navbar';

describe('MenuNavbar', () => {
  let component: MenuNavbar;
  let fixture: ComponentFixture<MenuNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuNavbar, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
