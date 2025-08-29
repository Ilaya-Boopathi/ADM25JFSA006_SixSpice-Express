import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Foodscroll } from './foodscroll';

describe('Foodscroll', () => {
  let component: Foodscroll;
  let fixture: ComponentFixture<Foodscroll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Foodscroll, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Foodscroll);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
