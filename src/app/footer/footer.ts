import { Component, input } from '@angular/core';
import { Links } from '../links/links';
import { LogoWithRedirect } from '../logo-with-redirect/logo-with-redirect';

@Component({
  selector: 'app-footer',
  imports: [Links, LogoWithRedirect],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {

}
