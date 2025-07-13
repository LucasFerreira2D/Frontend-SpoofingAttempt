import { App }                  from './app/app';        // seu root-component
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }        from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
  withXsrfConfiguration
} from '@angular/common/http';


import { routes } from './app/app.routes';
import {importProvidersFrom} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(
      withFetch(),               // <<< ativa Fetch API (keepalive, cache, etc)
      withInterceptorsFromDi(),
      withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' })
    )
  ]
})
  .catch(err => console.error(err));
