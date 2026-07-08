import { computed, inject, Injectable, signal } from '@angular/core';
import { UserService } from './user-service';
import { IUser } from '../types/user';

const SESSION_KEY = 'projeto-noticias:currentUserId';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userService = inject(UserService);

  private currentUserId = signal<string | null>(this.readSession());

  readonly currentUser = computed<IUser | null>(() => {
    const id = this.currentUserId();
    return id !== null ? (this.userService.findById(id) ?? null) : null;
  });

  readonly isLoggedIn = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  login(email: string, password: string): boolean {
    const user = this.userService.findByEmail(email);
    if (!user || user.password !== password) {
      return false;
    }

    this.currentUserId.set(user.id);
    sessionStorage.setItem(SESSION_KEY, user.id);
    return true;
  }

  logout(): void {
    this.currentUserId.set(null);
    sessionStorage.removeItem(SESSION_KEY);
  }

  private readSession(): string | null {
    return sessionStorage.getItem(SESSION_KEY);
  }
}
