import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpoofingAttemptList } from './components/spoofing-attempt-list/spoofing-attempt-list';

const routes: Routes = [
  { path: 'list', component: SpoofingAttemptList },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpoofingAttemptRoutingModule {}
