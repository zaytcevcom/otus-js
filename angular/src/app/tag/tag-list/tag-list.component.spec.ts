import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagListComponent } from './tag-list.component';
import { TagService } from '../tag.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

describe('TagListComponent', () => {
  let component: TagListComponent;
  let fixture: ComponentFixture<TagListComponent>;
  let mockTagService: jasmine.SpyObj<TagService>;

  beforeEach(async () => {
    mockTagService = jasmine.createSpyObj('TagService', ['getTags', 'deleteTag']);

    await TestBed.configureTestingModule({
      imports: [
        TagListComponent,
        MatDialogModule,
        MatSnackBarModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        { provide: TagService, useValue: mockTagService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TagListComponent);
    component = fixture.componentInstance;
    mockTagService.getTags.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
