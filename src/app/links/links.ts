import { Component, input } from '@angular/core';

export interface ILinks {
  label: string;
  href: string;
}

@Component({
  selector: 'app-links',
  imports: [],
  templateUrl: './links.html',
  styleUrl: './links.scss',
})
export class Links {
  links = input<ILinks[]>();
}
