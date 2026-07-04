export type UserRole = 'admin' | 'editor';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type IUserCreate = Omit<IUser, 'id'>;
