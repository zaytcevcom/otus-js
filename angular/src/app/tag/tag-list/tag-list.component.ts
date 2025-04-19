import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import {Tag} from '../models/tag.model';
import {TagService} from '../tag.service';
import {TagDialogComponent} from '../tag-dialog/tag-dialog.component';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class TagListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Tag>();

  constructor(
    private tagService: TagService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.tagService.getTags().subscribe(tags => {
      this.dataSource.data = tags;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(TagDialogComponent, {
      width: '500px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTags();
        this.snackBar.open('Тег успешно добавлен', 'Закрыть', { duration: 3000 });
      }
    });
  }

  openEditDialog(tag: Tag): void {
    const dialogRef = this.dialog.open(TagDialogComponent, {
      width: '500px',
      data: { mode: 'edit', tag }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTags();
        this.snackBar.open('Тег успешно обновлен', 'Закрыть', { duration: 3000 });
      }
    });
  }

  deleteTag(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Удаление тега',
        message: 'Вы уверены, что хотите удалить этот тег?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tagService.deleteTag(id).subscribe(() => {
          this.loadTags();
          this.snackBar.open('Тег успешно удален', 'Закрыть', { duration: 3000 });
        });
      }
    });
  }
}
