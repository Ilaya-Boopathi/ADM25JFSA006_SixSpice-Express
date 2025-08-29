import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OverviewModel } from '../../Models/overview-model';
import { ProfileService } from '../../Services/profile-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-edit-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-edit-component.html',
  styleUrls: ['./profile-edit-component.css']
})
export class ProfileEditComponent implements OnInit {
  @Input() restaurant!: OverviewModel | null;
  @Output() formSubmit = new EventEmitter<boolean>();
  @Output() formCancel = new EventEmitter<void>();

  // The '!' tells TypeScript that this will be initialized in ngOnInit
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      restaurantName: [this.restaurant?.restaurantName, Validators.required],
      cuisine: [this.restaurant?.cuisine, Validators.required],
      address: [this.restaurant?.address, Validators.required],
      hours: [this.restaurant?.hours, Validators.required],
      email: [this.restaurant?.email, [Validators.required, Validators.email]],
      owner: [this.restaurant?.owner, Validators.required],
      contact: [this.restaurant?.contact, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gst: [this.restaurant?.gst, [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]]
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedData: OverviewModel = {
        ...this.restaurant,
        ...this.editForm.value
      };
      this.profileService.updateProfile(updatedData).subscribe(
        () => {
          this.formSubmit.emit(true);
        },
        (error) => {
          console.error('Error updating profile:', error);
          this.formSubmit.emit(false);
        }
      );
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }
}