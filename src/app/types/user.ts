export type UserRole = 'admin' | 'editor';

export interface IUser {
  id: string;
  name: string;
  role: UserRole;
}

export type IUserCreate = Omit<IUser, 'id'>;
