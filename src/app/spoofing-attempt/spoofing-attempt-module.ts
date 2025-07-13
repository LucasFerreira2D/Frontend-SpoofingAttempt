// spoofing-attempt.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpoofingAttemptList } from './components/spoofing-attempt-list/spoofing-attempt-list';


// Angular Material
import { MatCardModule }       from '@angular/material/card';
import { MatTableModule }      from '@angular/material/table';
import { MatPaginatorModule }  from '@angular/material/paginator';
import { MatSortModule }       from '@angular/material/sort';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import {SpoofingAttemptRoutingModule} from './spoofing-attempt-routing-module';
import {ImageDialogComponent} from './components/image-dialog/image-dialog';
import {MapDialogComponent} from './components/map-dialog/map-dialog';


@NgModule({
  declarations: [
    SpoofingAttemptList,
    ImageDialogComponent,
    MapDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SpoofingAttemptRoutingModule,

    // Material
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class SpoofingAttemptModule {}

