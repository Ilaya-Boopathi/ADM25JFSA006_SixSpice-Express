import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { TrackingPageComponent } from './tracking-page-component';

describe('TrackingPageComponent', () => {
  let component: TrackingPageComponent;
  let fixture: ComponentFixture<TrackingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingPageComponent, RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ orderId: 'o1' })) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
