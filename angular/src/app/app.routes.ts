import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth/auth.guard';
import {NonAuthGuard} from './auth/non-auth.guard';

export const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
  {
    path: 'problems',
    loadComponent: () => import('./problems/problem-list/problem-list.component')
      .then(m => m.ProblemListComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'tags',
    loadComponent: () => import('./tag/tag-list/tag-list.component')
      .then(m => m.TagListComponent),
    canActivate: [AuthGuard]
  },
];
