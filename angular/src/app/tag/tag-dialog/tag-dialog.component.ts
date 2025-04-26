import {Component, DestroyRef, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { CommonModule } from '@angular/common';
import {Tag} from '../models/tag.model';
import {TagService} from '../tag.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

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
    private tagService: TagService,
    private destroyRef: DestroyRef
  ) {
    this.mode = data.mode;
    this.tag = data.tag || null;
  }

  onFormSubmit(tag: Tag): void {
    if (this.mode === 'add') {
      this.tagService.createTag(tag)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    } else if (this.mode === 'edit' && this.tag?.id) {
      this.tagService.updateTag(this.tag.id, tag)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }
}
