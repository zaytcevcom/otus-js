import { Component, Input } from '@angular/core';
import { Problem } from '../models/problem';
import {CommonModule} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatChip} from '@angular/material/chips';

@Component({
  selector: 'app-problem-details',
  templateUrl: './problem-details.component.html',
  standalone: true,
  styleUrls: ['./problem-details.component.scss'],
  imports: [CommonModule, MatCard, MatCardHeader, MatCardContent, MatChip]
})
export class ProblemDetailsComponent {
  @Input() problem: Problem | null = null;

  trackByTag(index: number, tag: string): string {
    return tag;
  }
}
