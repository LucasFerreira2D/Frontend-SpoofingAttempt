import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {
  DateAdapter,
  NativeDateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  MatDateFormats
} from '@angular/material/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import * as XLSX from 'xlsx';
import {SpoofingAttempt} from '../../models/spoofingAttempt';
import {SpoofingAttemptService} from '../../service/spoofingAttemptService';
import {MatDialog} from '@angular/material/dialog';
import {ImageDialogComponent} from '../image-dialog/image-dialog';
import {MapDialogComponent} from '../map-dialog/map-dialog';



registerLocaleData(localePt);

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {dateInput: 'DD/MM/YYYY'},
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

export class AppDateAdapter extends NativeDateAdapter {
  override parse(value: any): Date | null {
    if (typeof value === 'string' && value.includes('/')) {
      const [d, m, y] = value.split('/');
      return new Date(+y, +m - 1, +d);
    }
    return super.parse(value);
  }
}

@Component({
  standalone: false,
  selector: 'app-spoofing-attempt-list',
  templateUrl: './spoofing-attempt-list.html',
  styleUrls: ['./spoofing-attempt-list.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {provide: DateAdapter, useClass: AppDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
  ]
})
export class SpoofingAttemptList implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = ['id', 'attemptDateHour', 'map', 'imageSpoofing'];

  dataSource = new MatTableDataSource<SpoofingAttempt>([]);

  dateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  searchControl = new FormControl<string>('');

  constructor(
    private service: SpoofingAttemptService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.setupFilterPredicate();
      this.registerFilterListeners();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private setupFilterPredicate() {
    this.dataSource.filterPredicate = (item: SpoofingAttempt) => {
      const {start, end} = this.dateRange.value;
      const txt = this.searchControl.value?.trim().toLowerCase() || '';
      const dt = new Date(item.attemptDateHour);

      const okDate = (!start || dt >= start) && (!end || dt <= end);
      const okText = txt === ''
        ? true
        : Object.values(item)
          .some(v => v != null && v.toString().toLowerCase().includes(txt));

      return okDate && okText;
    };
  }

  private registerFilterListeners() {
    this.dateRange.valueChanges.subscribe(() => {
      this.dataSource.filter = '';
      this.paginator.firstPage();
    });
    this.searchControl.valueChanges.subscribe(() => {
      this.dataSource.filter = '';
      this.paginator.firstPage();
    });
  }

  exportExcel() {
    const exportData = this.dataSource.filteredData.map(r => ({
      ID: r.id,
      'Data/Hora': new Date(r.attemptDateHour).toLocaleString('pt-BR'),
      Latitude: r.latitude,
      Longitude: r.longitude
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Spoofing');
    XLSX.writeFile(wb, 'spoofing-attempts.xlsx');
  }

  openMap(latitude: number, longitude: number) {
    this.dialog.open(MapDialogComponent, {
      data: { latitude, longitude },
      panelClass: 'map-dialog-container'
    });
  }

  openImage(base64Image: string) {
    this.dialog.open(ImageDialogComponent, {
      data: { image: base64Image },
      panelClass: 'custom-dialog-container'
    });
  }

}
