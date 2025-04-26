import {Component, DestroyRef, OnInit} from '@angular/core';
import { ProblemService } from '../problem.service';
import { Problem } from '../models/problem';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ProblemFormComponent } from '../problem-form/problem-form.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatChip, MatChipListbox, MatChipsModule} from '@angular/material/chips';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {CommonModule, NgForOf} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  standalone: true,
  styleUrls: ['./problem-list.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatChip,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    NgForOf,
    MatChipListbox,
  ]
})
export class ProblemListComponent implements OnInit {
  problems: Problem[] = [];
  displayedColumns: string[] = ['id', 'title', 'difficulty', 'tags', 'actions'];

  constructor(
    private problemService: ProblemService,
    private dialog: MatDialog,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.loadProblems();
  }

  loadProblems(): void {
    this.problemService.getProblems()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(problems => {
        this.problems = problems;
      });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ProblemFormComponent, {
      width: '600px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProblems();
      }
    });
  }

  openEditDialog(problem: Problem): void {
    const dialogRef = this.dialog.open(ProblemFormComponent, {
      width: '600px',
      data: { mode: 'edit', problem }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProblems();
      }
    });
  }

  deleteProblem(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title: 'Confirm Delete', message: 'Are you sure you want to delete this problem?' }
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          this.problemService.deleteProblem(id).subscribe(() => {
            this.loadProblems();
          });
        }
      });
  }

  trackByTag(index: number, tag: string): string {
    return tag;
  }

  getDifficultyClass(difficulty: 'Easy' | 'Medium' | 'Hard'): string {
    switch (difficulty) {
      case 'Easy': return 'easy';
      case 'Medium': return 'medium';
      case 'Hard': return 'hard';
      default: return '';
    }
  }
}
