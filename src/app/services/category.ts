import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ICategory } from '../types/category';
import { map, Observable } from 'rxjs';

export type ICategoryCreate = Omit<ICategory, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private url = `${environment.supabaseUrl}category`;

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private writeHeaders = this.headers.set('Prefer', 'return=representation');

  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.url, { headers: this.headers });
  }

  getCategoryById(id: number): Observable<ICategory | null> {
    return this.http
      .get<ICategory[]>(`${this.url}?id=eq.${id}`, { headers: this.headers })
      .pipe(map((categories) => categories[0] ?? null));
  }

  create(category: ICategoryCreate): Observable<ICategory> {
    return this.http
      .post<ICategory[]>(this.url, category, { headers: this.writeHeaders })
      .pipe(map((categories) => categories[0]));
  }

  update(id: number, category: ICategoryCreate): Observable<ICategory> {
    return this.http
      .patch<ICategory[]>(`${this.url}?id=eq.${id}`, category, { headers: this.writeHeaders })
      .pipe(map((categories) => categories[0]));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}?id=eq.${id}`, { headers: this.headers });
  }
}
