import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IUser, IUserCreate } from '../types/user';
import { getCookie } from '../utils/cookie';
import { ACCESS_TOKEN_KEY } from '../utils/storage-keys';
import { toAuthUrl } from '../utils/supabase-auth-url';

interface SignUpResponse {
  id?: string;
  user?: { id: string };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private url = `${environment.supabaseUrl}profiles`;
  private authUrl = toAuthUrl(environment.supabaseUrl);

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      apikey: environment.supabaseKey,
      Authorization: `Bearer ${getCookie(ACCESS_TOKEN_KEY) ?? environment.supabaseKey}`,
      'Content-Type': 'application/json',
    });
  }

  private get writeHeaders(): HttpHeaders {
    return this.headers.set('Prefer', 'return=representation');
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.url}?select=id,name,role`, { headers: this.headers });
  }

  findById(id: string): Observable<IUser | null> {
    return this.http
      .get<IUser[]>(`${this.url}?id=eq.${id}&select=id,name,role`, { headers: this.headers })
      .pipe(map((users) => users[0] ?? null));
  }

  create(user: IUserCreate): Observable<IUser> {
    const signUpHeaders = new HttpHeaders({
      apikey: environment.supabaseKey,
      Authorization: `Bearer ${environment.supabaseKey}`,
      'Content-Type': 'application/json',
    });

    return this.http
      .post<SignUpResponse>(
        `${this.authUrl}signup`,
        { email: user.email, password: user.password },
        { headers: signUpHeaders },
      )
      .pipe(
        switchMap((res) => {
          const id = res.user?.id ?? res.id;
          if (!id) {
            throw new Error('Supabase did not return the new user id.');
          }

          return this.http.patch<IUser[]>(
            `${this.url}?id=eq.${id}`,
            { name: user.name, role: user.role },
            { headers: this.writeHeaders },
          );
        }),
        map((profiles) => profiles[0]),
      );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}?id=eq.${id}`, { headers: this.headers });
  }
}
