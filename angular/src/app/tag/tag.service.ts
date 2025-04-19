import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from './models/tag.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private API_URL = `${environment.apiUrl}/tags`;

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.API_URL);
  }

  getTag(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.API_URL}/${id}`);
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.API_URL, tag);
  }

  updateTag(id: number, tag: Tag): Observable<Tag> {
    return this.http.patch<Tag>(`${this.API_URL}/${id}`, tag);
  }

  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
