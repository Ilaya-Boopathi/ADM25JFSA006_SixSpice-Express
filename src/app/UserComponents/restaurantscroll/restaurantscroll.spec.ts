import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Restaurantscroll } from './restaurantscroll';

describe('Restaurantscroll', () => {
  let component: Restaurantscroll;
  let fixture: ComponentFixture<Restaurantscroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Restaurantscroll, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Restaurantscroll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
