import { computed, inject, Injectable, signal } from '@angular/core';
import { UserService } from './user-service';
import { IUser } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_ID_KEY = 'user_id';

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
  private userService = inject(UserService);

  private authUrl = environment.supabaseUrl.replace('/rest/v1/', '/auth/v1/');

  #accessToken = signal(localStorage.getItem(ACCESS_TOKEN_KEY));
  readonly token = this.#accessToken.asReadonly();

  private currentUserId = signal<string | null>(localStorage.getItem(USER_ID_KEY));

  readonly currentUser = computed<IUser | null>(() => {
    const id = this.currentUserId();
    return id !== null ? (this.userService.findById(id) ?? null) : null;
  });

  readonly isLoggedIn = computed(() => !!this.#accessToken());
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  readonly headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  login(email: string, password: string) {
    const loginUrl = `${this.authUrl}token?grant_type=password`;

    return this.#http
      .post<LoginResponse>(loginUrl, { email, password }, { headers: this.headers })
      .pipe(
        tap((res) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, res.access_token);
          localStorage.setItem(REFRESH_TOKEN_KEY, res.refresh_token);
          localStorage.setItem(USER_ID_KEY, res.user.id);

          this.#accessToken.set(res.access_token);
          this.currentUserId.set(res.user.id);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);

    this.#accessToken.set(null);
    this.currentUserId.set(null);
  }

  getAuthHeaders() {
    return new HttpHeaders({
      apikey: environment.supabaseKey,
      Authorization: `Bearer ${this.#accessToken()}`,
      'Content-Type': 'application/json',
    });
  }
}
