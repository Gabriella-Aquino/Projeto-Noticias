import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { INews, INewsResponse } from '../types/news';

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

  private toNews(news: INewsResponse): INews {
    return {
      id: news.id,
      title: news.title,
      subTitle: news.subTitle,
      content: news.content,
      image: news.cover,
      created: new Date(news.created_at),
      updated: news.updated_ed ? new Date(news.updated_ed) : null,
      author: news.author_id,
      category: news.category_id,
      main: news.main,
    };
  }

  getAll(): Observable<INews[]> {
    return this.http
      .get<INewsResponse[]>(`${this.url}?order=main.desc,created_at.desc`, {
        headers: this.headers,
      })
      .pipe(map((news) => news.map((n) => this.toNews(n))));
  }

  getNewById(id: number): Observable<INews | null> {
    return this.http
      .get<INewsResponse[]>(`${this.url}?id=eq.${id}`, { headers: this.headers })
      .pipe(map((news) => (news[0] ? this.toNews(news[0]) : null)));
  }
}
