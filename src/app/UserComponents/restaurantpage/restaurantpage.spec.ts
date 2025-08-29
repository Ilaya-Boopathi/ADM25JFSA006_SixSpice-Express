import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Restaurantpage } from './restaurantpage';

describe('Restaurantpage', () => {
  let component: Restaurantpage;
  let fixture: ComponentFixture<Restaurantpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Restaurantpage, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Restaurantpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
