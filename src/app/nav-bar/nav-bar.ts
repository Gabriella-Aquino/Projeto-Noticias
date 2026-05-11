import { Component } from '@angular/core';
import { Button } from '../button/button';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [Button, SearchBar],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {}
