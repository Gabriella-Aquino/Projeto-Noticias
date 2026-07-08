export type UserRole = 'admin' | 'editor';

export interface IUser {
  id: string;
  name: string;
  role: UserRole;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
