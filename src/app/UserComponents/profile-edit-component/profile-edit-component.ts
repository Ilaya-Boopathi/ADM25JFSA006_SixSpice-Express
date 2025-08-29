import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Services/user-service';
import { UserProfile } from '../../Models/user-profile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-edit-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile-edit-component.html',
  styleUrls: ['./profile-edit-component.css']
})
export class ProfileEditComponent implements OnInit {
  @Input() profile!: UserProfile | null;
  @Input() userId!: string;
  @Output() formSubmit = new EventEmitter<boolean>();
  @Output() formCancel = new EventEmitter<void>();

  editForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.profile?.name, Validators.required],
      phone: [this.profile?.phone, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: [this.profile?.address],
      profilePicture: [this.profile?.profilePicture]
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.userService.getUserById(this.userId).subscribe(user => {
        const updatedUser = { ...user, profile: this.editForm.value };
        this.userService.updateUser(this.userId, updatedUser).subscribe(
          () => this.formSubmit.emit(true),
          () => this.formSubmit.emit(false)
        );
      });
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}
