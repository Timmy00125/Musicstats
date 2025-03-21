// import { HttpInterceptorFn } from '@angular/common/http';

// export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

import { HttpInterceptorFn } from '@angular/common/http';

function getCookie(name: string): string | null {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\/+^])/g, '$1') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : null;
}

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  // Get CSRF token from browser cookies (Django writes it as "csrftoken")
  const csrfToken = getCookie('csrftoken');

  // Only add the header to outgoing POST (or non-safe) requests
  if (csrfToken && !req.headers.has('X-CSRFToken')) {
    const authRequest = req.clone({
      setHeaders: { 'X-CSRFToken': csrfToken },
    });
    return next(authRequest);
  }

  return next(req);
};
