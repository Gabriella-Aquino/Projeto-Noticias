import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { IAuthor } from '../types/author';

export type IAuthorCreate = Omit<IAuthor, 'id'>;

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

  private writeHeaders = this.headers.set('Prefer', 'return=representation');

  getAll(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(this.url, { headers: this.headers });
  }

  getAuthorById(id: number): Observable<IAuthor | null> {
    return this.http
      .get<IAuthor[]>(`${this.url}?id=eq.${id}`, { headers: this.headers })
      .pipe(map((authors) => authors[0] ?? null));
  }

  create(author: IAuthorCreate): Observable<IAuthor> {
    return this.http
      .post<IAuthor[]>(this.url, author, { headers: this.writeHeaders })
      .pipe(map((authors) => authors[0]));
  }

  update(id: number, author: IAuthorCreate): Observable<IAuthor> {
    return this.http
      .patch<IAuthor[]>(`${this.url}?id=eq.${id}`, author, { headers: this.writeHeaders })
      .pipe(map((authors) => authors[0]));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}?id=eq.${id}`, { headers: this.headers });
  }
}
