import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Foodpage } from './foodpage';

describe('Foodpage', () => {
  let component: Foodpage;
  let fixture: ComponentFixture<Foodpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Foodpage, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Foodpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
