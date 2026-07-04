import { Injectable, signal } from '@angular/core';
import { IUser, IUserCreate } from '../types/user';

const SEED_USERS: IUser[] = [
  { id: 1, name: 'Administrador', email: 'admin@jornal.com', password: 'Admin@123', role: 'admin' },
  { id: 2, name: 'Editor', email: 'editor@jornal.com', password: 'Editor@123', role: 'editor' },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSignal = signal<IUser[]>(SEED_USERS);
  private nextId = signal(SEED_USERS.length + 1);

  readonly users = this.usersSignal.asReadonly();

  getAll(): IUser[] {
    return this.usersSignal();
  }

  findByEmail(email: string): IUser | undefined {
    return this.usersSignal().find((user) => user.email.toLowerCase() === email.toLowerCase());
  }

  findById(id: number): IUser | undefined {
    return this.usersSignal().find((user) => user.id === id);
  }

  emailExists(email: string, excludeId?: number): boolean {
    return this.usersSignal().some(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.id !== excludeId
    );
  }

  create(user: IUserCreate): IUser {
    const newUser: IUser = { ...user, id: this.nextId() };
    this.nextId.update((id) => id + 1);
    this.usersSignal.update((users) => [...users, newUser]);
    return newUser;
  }

  delete(id: number): void {
    this.usersSignal.update((users) => users.filter((user) => user.id !== id));
  }
}
