import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ICategory } from '../types/category';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private url = `${environment.supabaseUrl}category`;

  private headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.url, { headers: this.headers });
  }

  getCategoryById(id: number): Observable<ICategory | null> {
    return this.http
      .get<ICategory[]>(`${this.url}?id=eq.${id}`, { headers: this.headers })
      .pipe(map((categories) => categories[0] ?? null));
  }
}
