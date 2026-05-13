import { booleanAttribute, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo-with-redirect',
  imports: [RouterLink],
  templateUrl: './logo-with-redirect.html',
  styleUrl: './logo-with-redirect.scss',
})
export class LogoWithRedirect {
  showTitle = input(true, { transform: booleanAttribute });
  variant = input<'black' | 'white'>('black');
}
