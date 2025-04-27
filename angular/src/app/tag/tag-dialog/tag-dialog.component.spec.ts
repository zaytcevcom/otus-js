import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagDialogComponent } from './tag-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagService } from '../tag.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('TagDialogComponent', () => {
  let component: TagDialogComponent;
  let fixture: ComponentFixture<TagDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<TagDialogComponent>>;
  let mockTagService: jasmine.SpyObj<TagService>;

  const mockDialogData = {
    mode: 'add',
    tag: null
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockTagService = jasmine.createSpyObj('TagService', ['createTag', 'updateTag']);

    await TestBed.configureTestingModule({
      imports: [
        TagDialogComponent,
        TagFormComponent,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        { provide: TagService, useValue: mockTagService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with add mode', () => {
    expect(component.mode).toBe('add');
    expect(component.tag).toBeNull();
  });
});
