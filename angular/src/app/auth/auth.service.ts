import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = environment.apiUrl + '/auth';
  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticated$.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        this._isAuthenticated$.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this._isAuthenticated$.next(false);
  }

  private checkAuthStatus() {
    const token = localStorage.getItem('auth_token');
    this._isAuthenticated$.next(!!token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
