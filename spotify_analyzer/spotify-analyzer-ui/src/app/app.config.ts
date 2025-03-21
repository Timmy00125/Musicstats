import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';

import { authInterceptorInterceptor } from './auth-interceptor.interceptor';
import { csrfInterceptor } from './csrf.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    {
      provide: HTTP_INTERCEPTORS, // Register the interceptor
      useValue: authInterceptorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS, // Register the interceptor
      useValue: csrfInterceptor,
      multi: true,
    },
  ],
};
