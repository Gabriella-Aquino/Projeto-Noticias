import { IAuthor } from './author';
import { ICategory } from './category';

export interface INews {
  title: string;
  subTitle: string;
  content: string;
  image: string;
  created: Date;
  updated: Date;
  author: IAuthor;
  category: ICategory;
  main?: boolean;
}
