import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'spoofing/list', pathMatch: 'full' },
  {
    path: 'spoofing',
    loadChildren: () =>
      import('./spoofing-attempt/spoofing-attempt-module')
        .then(m => m.SpoofingAttemptModule)
  },
  { path: '**', redirectTo: 'spoofing/list' },
];
