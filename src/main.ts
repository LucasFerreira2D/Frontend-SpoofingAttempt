import { App }                  from './app/app';        // seu root-component
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }        from '@angular/router';
import {
  provideHttpClient,
  withFetch, withInterceptors,
  withInterceptorsFromDi,
  withXsrfConfiguration
} from '@angular/common/http';


import { routes } from './app/app.routes';
import {importProvidersFrom} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {apiKeyInterceptor} from './app/interceptors/api-key.interceptor';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
      withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' }),
      withInterceptors([
        apiKeyInterceptor
      ])
    ),
    provideCharts(withDefaultRegisterables())
  ]
})
  .catch(err => console.error(err));
