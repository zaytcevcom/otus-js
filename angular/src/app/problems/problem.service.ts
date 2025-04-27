import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Problem } from './models/problem';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private readonly API_URL = `${environment.apiUrl}/problems`;

  constructor(private http: HttpClient) { }

  getProblems(): Observable<Problem[]> {
    return this.http.get<Problem[]>(this.API_URL);
  }

  getProblem(id: number): Observable<Problem> {
    return this.http.get<Problem>(`${this.API_URL}/${id}`);
  }

  createProblem(problem: Problem): Observable<Problem> {
    return this.http.post<Problem>(this.API_URL, problem);
  }

  updateProblem(id: number, problem: Problem): Observable<Problem> {
    return this.http.patch<Problem>(`${this.API_URL}/${id}`, problem);
  }

  deleteProblem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
