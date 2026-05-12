import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { UserOutline, MailOutline, SearchOutline, MenuOutline } from '@ant-design/icons-angular/icons';

import { routes } from './app.routes';
import { pt_BR, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { provideNzIcons } from 'ng-zorro-antd/icon';

registerLocaleData(pt);

const icons = [UserOutline, MailOutline, SearchOutline, MenuOutline];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNzI18n(pt_BR),
    provideNzIcons(icons),
  ],
};
