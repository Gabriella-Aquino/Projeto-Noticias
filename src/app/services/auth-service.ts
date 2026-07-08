import { computed, inject, Injectable, signal } from '@angular/core';
import { UserService } from './user-service';
import { IUser } from '../types/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_ID_KEY } from '../utils/storage-keys';

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

  #currentUser = signal<IUser | null>(null);
  readonly currentUser = this.#currentUser.asReadonly();

  readonly isLoggedIn = computed(() => !!this.#accessToken());
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  readonly headers = new HttpHeaders({
    apikey: environment.supabaseKey,
    Authorization: `Bearer ${environment.supabaseKey}`,
    'Content-Type': 'application/json',
  });

  constructor() {
    const userId = getCookie(USER_ID_KEY);
    if (userId) {
      this.loadProfile(userId);
    }
  }

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
          this.loadProfile(res.user.id);
        }),
      );
  }

  logout(): void {
    deleteCookie(ACCESS_TOKEN_KEY);
    deleteCookie(REFRESH_TOKEN_KEY);
    deleteCookie(USER_ID_KEY);

    this.#accessToken.set(null);
    this.#currentUser.set(null);
  }

  getAuthHeaders() {
    return new HttpHeaders({
      apikey: environment.supabaseKey,
      Authorization: `Bearer ${this.#accessToken()}`,
      'Content-Type': 'application/json',
    });
  }

  private loadProfile(id: string): void {
    this.userService.findById(id).subscribe((profile) => this.#currentUser.set(profile));
  }
}
