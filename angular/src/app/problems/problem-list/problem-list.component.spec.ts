import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import {ProblemService} from '../problem.service';
import {Problem} from '../models/problem';

describe('ProblemService', () => {
  let service: ProblemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProblemService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ProblemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch problems', () => {
    const mockProblems: Problem[] = [
      {
        id: 1,
        title: 'Two Sum',
        description: 'Given an array of integers...',
        inputExample: '[2,7,11,15]',
        outputExample: '[0,1]',
        difficulty: 'Easy',
        tags: ['Array', 'Hash Table'],
        additionalMaterials: [101, 203],
        rating: 4.5,
        createdBy: 42,
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-01-20')
      }
    ];

    service.getProblems().subscribe(problems => {
      expect(problems).toEqual(mockProblems);
    });

    const req = httpMock.expectOne('http://otus.localhost/api/problems');
    expect(req.request.method).toBe('GET');
    req.flush(mockProblems);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
