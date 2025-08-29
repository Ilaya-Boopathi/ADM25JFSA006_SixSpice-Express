import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { UserProfileComponent } from './profile';
import { UserService } from '../../Services/user-service';

class MockUserService {
  getUserById() { return of({ id: 'u1', email: '', password: '', profile: { name: '', phone: '', address: '' }, orders: [], cart: [], totalAmount: 0 }); }
}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent, RouterTestingModule],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    spyOn(localStorage, 'getItem').and.returnValue('u1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
