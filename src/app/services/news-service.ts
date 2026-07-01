import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { INews } from '../types/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private http = inject(HttpClient);
  private url = `${environment.supabaseUrl}news`;

  private headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  getAll(): Observable<INews[]> {
    return this.http.get<INews[]>(`${this.url}?order=main.desc,created_at.desc`, {
      headers: this.headers,
    });
  }

  getNewById(id: number): Observable<INews | null> {
    return this.http
      .get<INews[]>(`${this.url}?id=eq.${id}`, { headers: this.headers })
      .pipe(map((news) => news[0] ?? null));
  }
}
