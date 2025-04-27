import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {Tag} from '../models/tag.model';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class TagFormComponent implements OnInit {
  @Input() tag: Tag | null = null;
  @Output() formSubmit = new EventEmitter<Tag>();
  @Output() cancel = new EventEmitter<void>();

  tagForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tagForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    if (this.tag) {
      this.tagForm.patchValue(this.tag);
    }
  }

  onSubmit(): void {
    if (this.tagForm.valid) {
      const tagData: Tag = {
        ...this.tag,
        ...this.tagForm.value
      };
      this.formSubmit.emit(tagData);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
