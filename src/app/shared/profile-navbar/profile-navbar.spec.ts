import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileNavbar } from './profile-navbar';

describe('ProfileNavbar', () => {
  let component: ProfileNavbar;
  let fixture: ComponentFixture<ProfileNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileNavbar, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
