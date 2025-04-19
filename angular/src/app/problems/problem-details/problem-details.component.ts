import { Component, Input } from '@angular/core';
import { Problem } from '../models/problem';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-problem-details',
  templateUrl: './problem-details.component.html',
  standalone: true,
  styleUrls: ['./problem-details.component.scss'],
  imports: [CommonModule]
})
export class ProblemDetailsComponent {
  @Input() problem: Problem | null = null;
}
