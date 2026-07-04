import { Injectable, signal } from '@angular/core';
import { IUser, IUserCreate } from '../types/user';

const SEED_USERS: IUser[] = [
  {
    id: '3e2f6f8a-2b7a-4c3e-9c1a-9a6b8b1e1a01',
    name: 'Administrador',
    email: 'admin@jornal.com',
    password: 'Admin@123',
    role: 'admin',
  },
  {
    id: '3e2f6f8a-2b7a-4c3e-9c1a-9a6b8b1e1a02',
    name: 'Editor',
    email: 'editor@jornal.com',
    password: 'Editor@123',
    role: 'editor',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersSignal = signal<IUser[]>(SEED_USERS);

  readonly users = this.usersSignal.asReadonly();

  getAll(): IUser[] {
    return this.usersSignal();
  }

  findByEmail(email: string): IUser | undefined {
    return this.usersSignal().find((user) => user.email.toLowerCase() === email.toLowerCase());
  }

  findById(id: string): IUser | undefined {
    return this.usersSignal().find((user) => user.id === id);
  }

  emailExists(email: string, excludeId?: string): boolean {
    return this.usersSignal().some(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.id !== excludeId
    );
  }

  create(user: IUserCreate): IUser {
    const newUser: IUser = { ...user, id: crypto.randomUUID() };
    this.usersSignal.update((users) => [...users, newUser]);
    return newUser;
  }

  delete(id: string): void {
    this.usersSignal.update((users) => users.filter((user) => user.id !== id));
  }
}
