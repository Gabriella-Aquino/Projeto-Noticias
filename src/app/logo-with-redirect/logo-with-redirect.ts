import { booleanAttribute, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Image } from '../components/image/image';

@Component({
  selector: 'app-logo-with-redirect',
  imports: [RouterLink, Image],
  templateUrl: './logo-with-redirect.html',
  styleUrl: './logo-with-redirect.scss',
})
export class LogoWithRedirect {
  showTitle = input(true, { transform: booleanAttribute });
  variant = input<'black' | 'white'>('black');
}
