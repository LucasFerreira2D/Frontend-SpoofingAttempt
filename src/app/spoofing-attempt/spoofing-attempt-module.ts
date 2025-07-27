// spoofing-attempt.module.ts
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SpoofingAttemptList} from './components/spoofing-attempt-list/spoofing-attempt-list';


// Angular Material
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {SpoofingAttemptRoutingModule} from './spoofing-attempt-routing-module';
import {ImageDialogComponent} from './components/image-dialog/image-dialog';
import {MapDialogComponent} from './components/map-dialog/map-dialog';
import {GoogleMapsModule} from '@angular/google-maps';
import {BaseChartDirective, provideCharts, withDefaultRegisterables} from 'ng2-charts'
import {BarChartComponent} from "./components/bar-chart/bar-chart";
import {RadarChartComponent} from './components/radar-chart/radar-chart';

@NgModule({
  declarations: [
    SpoofingAttemptList,
    ImageDialogComponent,
    MapDialogComponent,
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
        GoogleMapsModule,
        BaseChartDirective,
        MatCardHeader,
        MatCardContent,
        BaseChartDirective,
        MatCard,
        BarChartComponent,
        RadarChartComponent
    ],
  providers: [
    provideCharts(withDefaultRegisterables())
  ]
})
export class SpoofingAttemptModule {
}

