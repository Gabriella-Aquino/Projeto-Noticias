import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IUser, IUserCreate } from '../types/user';
import { getCookie } from '../utils/cookie';
import { ACCESS_TOKEN_KEY } from '../utils/storage-keys';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private url = `${environment.supabaseUrl}profiles`;

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      apikey: environment.supabaseKey,
      Authorization: `Bearer ${getCookie(ACCESS_TOKEN_KEY) ?? environment.supabaseKey}`,
      'Content-Type': 'application/json',
    });
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}?select=id,name,role`, { headers: this.headers });
  }

  findById(id: string): Observable<IUser | null> {
    return this.http
      .get<IUser[]>(`${this.url}?id=eq.${id}&select=id,name,role`, { headers: this.headers })
      .pipe(map((users) => users[0] ?? null));
  }

  create(_user: IUserCreate): Observable<IUser | null> {

    return of(null);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}?id=eq.${id}`, { headers: this.headers });
  }
}
