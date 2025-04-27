import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProblemFormComponent } from './problem-form.component';
import { ProblemService } from '../problem.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

describe('ProblemFormComponent', () => {
  let component: ProblemFormComponent;
  let fixture: ComponentFixture<ProblemFormComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;
  const mockDialogData = {
    title: 'Test Title',
    message: 'Test Message'
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ProblemFormComponent,
        CommonModule,
        MatChipsModule
      ],
      providers: [
        ProblemService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProblemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
