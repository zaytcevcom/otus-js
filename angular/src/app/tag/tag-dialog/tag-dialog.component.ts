import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { CommonModule } from '@angular/common';
import {Tag} from '../models/tag.model';
import {TagService} from '../tag.service';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    TagFormComponent
  ]
})
export class TagDialogComponent {
  mode: 'add' | 'edit' = 'add';
  tag: Tag | null = null;

  constructor(
    public dialogRef: MatDialogRef<TagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tagService: TagService
  ) {
    this.mode = data.mode;
    this.tag = data.tag || null;
  }

  onFormSubmit(tag: Tag): void {
    if (this.mode === 'add') {
      this.tagService.createTag(tag).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else if (this.mode === 'edit' && this.tag?.id) {
      this.tagService.updateTag(this.tag.id, tag).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
