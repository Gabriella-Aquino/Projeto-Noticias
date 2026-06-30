import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { IAuthor } from '../types/author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private http = inject(HttpClient);
  private url = `${environment.supabaseUrl}author`;

  private headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  getAll(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(this.url, { headers: this.headers });
  }

  getCategoryById(id: number): Observable<IAuthor | null> {
      return this.http
        .get<IAuthor[]>(`${this.url}?id=eq.${id}`, { headers: this.headers })
        .pipe(map((authors) => authors[0] ?? null));
    }
}
