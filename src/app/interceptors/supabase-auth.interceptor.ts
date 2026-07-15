import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { getCookie } from '../utils/cookie';
import { ACCESS_TOKEN_KEY } from '../utils/storage-keys';

const supabaseOrigin = new URL(environment.supabaseUrl).origin;

export const supabaseAuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(supabaseOrigin)) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        apikey: environment.supabaseKey,
        Authorization: `Bearer ${getCookie(ACCESS_TOKEN_KEY) ?? environment.supabaseKey}`,
      },
    }),
  );
};
