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
