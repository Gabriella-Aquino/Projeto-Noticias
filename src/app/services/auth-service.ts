import { computed, inject, Injectable, signal } from '@angular/core';
import { UserService } from './user-service';
import { IUser } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';

const SESSION_KEY = 'projeto-noticias:currentUserId';
interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: {
    id: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);

  #accessToken = signal(localStorage.getItem('access_token'));

  readonly token = this.#accessToken.asReadonly();

  readonly headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  private userService = inject(UserService);

  private currentUserId = signal<string | null>(this.readSession());

  readonly currentUser = computed<IUser | null>(() => {
    const id = this.currentUserId();
    return id !== null ? (this.userService.findById(id) ?? null) : null;
  });

  readonly isLoggedIn = computed(() => !!this.#accessToken());
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  login(email: string, password: string) {
    const loginUrl = `${environment.supabaseUrl.replace('/rest/v1/', '/auth/v1/')}token?grant_type=password`;
    return this.#http
      .post<LoginResponse>(loginUrl, { email, password }, { headers: this.headers })
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          localStorage.setItem('user_id', res.user.id);

          this.#accessToken.set(res.access_token);
        }),
      );
  }

  logout(): void {
    this.currentUserId.set(null);
    sessionStorage.removeItem(SESSION_KEY);
  }

  private readSession(): string | null {
    return sessionStorage.getItem(SESSION_KEY);
  }

  getAuthHeaders() {
    return new HttpHeaders({
      apikey: environment.supabaseKey,
      Authorization: `Bearer ${this.#accessToken()}`,
      'Content-Type': 'application/json',
    });
  }
}
