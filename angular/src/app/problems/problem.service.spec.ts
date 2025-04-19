import { TestBed } from '@angular/core/testing';

import { ProblemService } from './problem.service';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('ProblemService', () => {
  let service: ProblemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProblemService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ProblemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
