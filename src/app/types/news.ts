import { IAuthor } from './author';
import { ICategory } from './category';

export interface INews {
  id: number;
  title: string;
  subTitle: string;
  content: string;
  image: string;
  created: Date;
  updated: Date | null;
  author: IAuthor["id"];
  category: ICategory['id'];
  main?: boolean;
}

export interface INewsResponse {
  id: number;
  created_at: string;
  title: string;
  subTitle: string;
  content: string;
  cover: string;
  updated_ed: string | null;
  main?: boolean;
  author_id: IAuthor['id'];
  category_id: ICategory['id'];
}
