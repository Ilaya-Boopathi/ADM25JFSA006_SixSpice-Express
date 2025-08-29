import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Searchpage } from './searchpage';
import { Restaurantdata } from '../../services copy/restaurantdata';
import { Cartitems } from '../../services copy/cartitems';

class MockRestaurantdata {
  getRestaurants() { return of([]); }
}

class MockCartitems {
  getCartItems() { return of([]); }
  addToCart() { return of({}); }
}

describe('Searchpage', () => {
  let component: Searchpage;
  let fixture: ComponentFixture<Searchpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Searchpage, RouterTestingModule],
      providers: [
        { provide: Restaurantdata, useClass: MockRestaurantdata },
        { provide: Cartitems, useClass: MockCartitems },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Searchpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
