import { computed, inject, Injectable, signal } from '@angular/core';
import { UserService } from './user-service';
import { IUser } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_ID_KEY = 'user_id';
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30;

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

  #accessToken = signal(getCookie(ACCESS_TOKEN_KEY));
  readonly token = this.#accessToken.asReadonly();

  private currentUserId = signal<string | null>(getCookie(USER_ID_KEY));

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
          setCookie(ACCESS_TOKEN_KEY, res.access_token, res.expires_in);
          setCookie(REFRESH_TOKEN_KEY, res.refresh_token, REFRESH_TOKEN_MAX_AGE);
          setCookie(USER_ID_KEY, res.user.id, REFRESH_TOKEN_MAX_AGE);

          this.#accessToken.set(res.access_token);
          this.currentUserId.set(res.user.id);
        }),
      );
  }

  logout(): void {
    deleteCookie(ACCESS_TOKEN_KEY);
    deleteCookie(REFRESH_TOKEN_KEY);
    deleteCookie(USER_ID_KEY);

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
