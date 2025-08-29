import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MenuService } from '../../Services/menu-service';
import { MenuModel } from '../../Models/menu-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-menu-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-menu-component.html',
  styleUrls: ['./add-edit-menu-component.css']
})
export class AddEditMenuComponent implements OnInit, OnChanges {
  @Input() item: MenuModel | null = null;
  @Input() isEditMode: boolean = false;
  @Output() formSubmit = new EventEmitter<boolean>();

  itemForm!: FormGroup;

  categories: string[] = [
    'Main Course',
    'Snacks',
    'Appetizer',
    'Dessert',
    'Beverage',
    'Bread'
  ];

  constructor(private fb: FormBuilder, private menuService: MenuService) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'] && this.itemForm) {
      this.itemForm.patchValue({
        name: this.item?.name || '',
        price: this.item?.price || '',
        category: this.item?.category || ''
      });
    }
  }

  initForm(): void {
    this.itemForm = this.fb.group({
      name: [this.item?.name || '', Validators.required],
      price: [this.item?.price || '', [Validators.required, Validators.min(1)]],
      category: [this.item?.category || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.itemForm.invalid) return;

    const formData = this.itemForm.value;
    const restaurantId = this.item?.restaurantId ?? localStorage.getItem('restaurantId') ?? '';

    const menuData: MenuModel = {
      id: this.item?.id ?? Math.random().toString(36).substring(2, 6),
      name: formData.name,
      price: formData.price,
      category: formData.category,
      available: true,
      restaurantId: restaurantId,
      image:formData.image
    };

    if (this.isEditMode && this.item) {
      this.menuService.updateMenuItem(menuData.id, menuData).subscribe(() => {
        this.formSubmit.emit(true);
      });
    } else {
      this.menuService.addMenuItem(menuData).subscribe(() => {
        this.formSubmit.emit(true);
      });
    }

    this.itemForm.reset();
    this.item = null;
  }

  onCancel(): void {
    this.formSubmit.emit(false);
  }
}
