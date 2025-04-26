import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ProblemService } from '../problem.service';
import { Problem } from '../models/problem';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {CommonModule, NgIf} from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-problem-form',
  templateUrl: './problem-form.component.html',
  standalone: true,
  styleUrls: ['./problem-form.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    MatSelectModule,
    MatOptionModule
  ]
})
export class ProblemFormComponent implements OnInit {
  problemForm: FormGroup;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private problemService: ProblemService,
    private dialogRef: MatDialogRef<ProblemFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'create' | 'edit', problem?: Problem }
  ) {
    this.problemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      inputExample: ['', Validators.required],
      outputExample: ['', Validators.required],
      difficulty: ['Easy', Validators.required],
      tags: [[]],
      additionalMaterials: [[]]
    });
  }

  ngOnInit(): void {
    if (this.data.mode === 'edit' && this.data.problem) {
      this.problemForm.patchValue(this.data.problem);
    }
  }

  onSubmit(): void {
    if (this.problemForm.valid) {
      this.isSubmitting = true;
      const problemData = this.problemForm.value;

      const operation = this.data.mode === 'create'
        ? this.problemService.createProblem(problemData)
        : this.problemService.updateProblem(this.data.problem!.id!, problemData);

      operation.subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      const tags = this.problemForm.get('tags')?.value as string[];
      this.problemForm.get('tags')?.setValue([...tags, value]);
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const tags = this.problemForm.get('tags')?.value as string[];
    const index = tags.indexOf(tag);
    if (index >= 0) {
      tags.splice(index, 1);
      this.problemForm.get('tags')?.setValue([...tags]);
    }
  }

  addMaterial(event: MatChipInputEvent): void {
    const value = +(event.value || '').trim();
    if (!isNaN(value)) {
      const materials = this.problemForm.get('additionalMaterials')?.value as number[];
      this.problemForm.get('additionalMaterials')?.setValue([...materials, value]);
    }
    event.chipInput!.clear();
  }

  removeMaterial(material: number): void {
    const materials = this.problemForm.get('additionalMaterials')?.value as number[];
    const index = materials.indexOf(material);
    if (index >= 0) {
      materials.splice(index, 1);
      this.problemForm.get('additionalMaterials')?.setValue([...materials]);
    }
  }

  trackByTag(index: number, tag: string): string {
    return tag;
  }
}
